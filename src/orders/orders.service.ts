import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersGateway } from './orders.gateway';
import { SettingsService } from 'src/settings/settings.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private ordersGateway: OrdersGateway,
    private readonly settingsService: SettingsService,
    private readonly mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const storeSettings = await this.settingsService.findOne();

    if (!storeSettings.opened) {
      throw new BadRequestException('Store is closed');
    }

    if (createOrderDto.couponId) {
      const coupon = await this.prismaService.coupon.findUnique({
        where: { id: createOrderDto.couponId },
      });

      if (!coupon) {
        throw new BadRequestException('Coupon not found');
      }

      if (coupon.expiresAt < new Date()) {
        throw new BadRequestException('Coupon expired');
      }

      if (coupon.usedCount >= coupon.maxUses) {
        throw new BadRequestException('Coupon max uses reached');
      }

      await this.prismaService.coupon.update({
        where: { id: coupon.id },
        data: { usedCount: coupon.usedCount + 1 },
      });
    }

    const order = await this.prismaService.order.create({
      data: {
        userId: createOrderDto.userId,
        addressId: createOrderDto.isWithdrawal
          ? null
          : createOrderDto.addressId,
        observation: createOrderDto.orderObservation,
        isWithdrawal: createOrderDto.isWithdrawal,
        products: {
          create: await Promise.all(
            createOrderDto.products.map(async (product) => {
              const productData = await this.prismaService.product.findUnique({
                where: { id: product.productId },
              });

              if (!productData) {
                console.log('product Data not found');
              }

              return {
                observation: product.productObservation,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                productTitleSnapshot: productData.title,
                productPriceSnapshot: product.price,
                variants: {
                  create: product.variants.map((variant) => ({
                    variantName: variant.variantName,
                    variantPrice: variant.variantPrice,
                  })),
                },
              };
            }),
          ),
        },
        status: OrderStatus.PENDING,
        total: createOrderDto.total,
        discount: createOrderDto.discount,
        deliveryCost: createOrderDto.deliveryCost,
        paymentMethod: createOrderDto.paymentMethod,
        paymentChange: createOrderDto.paymentChange,
        addressSnapshot: createOrderDto.addressSnapshot,
        deliveryTime: storeSettings.deliveryTime,
        userSnapshot: createOrderDto.userSnapshot,
        couponId: createOrderDto.couponId,
        new: true,
      },
      include: {
        products: {
          include: {
            variants: true,
          },
        },
      },
    });

    this.ordersGateway.server.emit('orderCreated', order);
    return order;
  }

  async findAllPaginated({
    page = 1,
    perPage = 10,
    customerName,
    status,
    deliveryMethod,
    paymentMethod,
    period,
  }: {
    page?: number;
    perPage?: number;
    customerName?: string;
    status?: 'all' | keyof typeof OrderStatus;
    deliveryMethod?: 'delivery' | 'withdrawal' | 'all';
    paymentMethod?: 'all' | 'money' | 'card' | 'pix';
    period?: 'all' | 'today' | 'yesterday' | 'last3Days' | 'lastMonth';
  }) {
    const skip = page * perPage;

    const filters: Record<string, any> = {};

    if (status && status !== 'all') {
      filters.status = status;
    }

    if (deliveryMethod && deliveryMethod !== 'all') {
      filters.isWithdrawal = deliveryMethod === 'withdrawal';
    }

    if (paymentMethod && paymentMethod !== 'all') {
      filters.paymentMethod = paymentMethod;
    }

    if (customerName) {
      filters.user = {
        OR: [
          {
            firstName: {
              contains: customerName,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: customerName,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (period && period !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let startDate: Date | null = null;

      switch (period) {
        case 'today':
          startDate = today;
          break;
        case 'yesterday':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 1);
          filters.createdAt = {
            gte: startDate,
            lt: today,
          };
          break;
        case 'last3Days':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 3);
          break;
        case 'lastMonth':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
      }

      if (startDate && period !== 'yesterday') {
        filters.createdAt = {
          gte: startDate,
        };
      }
    }

    const orders = await this.prismaService.order.findMany({
      where: filters,
      skip,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        isWithdrawal: true,
        discount: true,
        observation: true,
        deliveryCost: true,
        createdAt: true,
        deliveryTime: true,
        status: true,
        total: true,
        paymentChange: true,
        paymentMethod: true,
        userSnapshot: true,
        addressSnapshot: true,
        products: {
          include: {
            variants: true,
          },
        },
      },
    });

    const aggregates = await this.prismaService.order.aggregate({
      where: filters,
      _sum: {
        deliveryCost: true,
        total: true,
      },
      _count: true,
    });

    return {
      data: orders,
      pagination: {
        page,
        perPage,
        total: aggregates._count,
      },
      totals: {
        deliveryCost: aggregates._sum.deliveryCost ?? 0,
        totalSales: aggregates._sum.total ?? 0,
      },
    };
  }

  async findOrdersInProgress() {
    const now = new Date();
    const currentHour = now.getHours();

    // Definir o início do período
    const startDate = new Date(now);
    if (currentHour < 2) {
      startDate.setDate(startDate.getDate() - 1);
    }
    startDate.setHours(9, 0, 0, 0);

    // Definir o fim do período
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(2, 0, 0, 0);

    // Buscar pedidos no período com os status desejados
    const orders = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
        status: {
          in: ['PENDING', 'IN_PROGRESS', 'DELIVERY_IN_PROGRESS'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        products: {
          include: {
            variants: true,
          },
        },
        address: true,
        user: true,
      },
    });

    const result = {
      waiting: orders.filter((o) => o.status === 'PENDING'),
      inProgress: orders.filter((o) => o.status === 'IN_PROGRESS'),
      inDelivery: orders.filter((o) => o.status === 'DELIVERY_IN_PROGRESS'),
    };

    return result;
  }

  async findNewOrders() {
    const newOrders = await this.prismaService.order.findMany({
      select: {
        products: {
          include: {
            variants: true,
          },
        },
        addressSnapshot: true,
        id: true,
        isWithdrawal: true,
        discount: true,
        observation: true,
        deliveryCost: true,
        createdAt: true,
        deliveryTime: true,
        status: true,
        total: true,
        userSnapshot: true,
        paymentChange: true,
        paymentMethod: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        new: true,
      },
    });

    newOrders.forEach((order) => {
      this.prismaService.order
        .update({
          where: { id: order.id },
          data: {
            new: false,
          },
        })
        .then(() => {
          this.ordersGateway.server.emit('orderCreated', order);
        })
        .catch(() => {
          console.log('Error updating order to not new');
        });
    });

    return newOrders;
  }

  async listUserOrders(userId: string) {
    return await this.prismaService.order.findMany({
      where: {
        userId,
      },
      select: {
        products: {
          include: {
            variants: true,
          },
        },
        addressSnapshot: true,
        id: true,
        isWithdrawal: true,
        discount: true,
        observation: true,
        deliveryCost: true,
        createdAt: true,
        deliveryTime: true,
        status: true,
        total: true,
        paymentChange: true,
        paymentMethod: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.order.findUnique({
      where: { id },
      include: {
        user: true,
        products: {
          include: {
            variants: true,
          },
        },
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prismaService.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status,
      },
      include: {
        products: {
          include: {
            variants: true,
          },
        },
      },
    });

    const fullOrder = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (updateOrderDto.status !== OrderStatus.CANCELED) {
      this.mailService
        .sendOrderEmail(fullOrder)
        .then(() => {})
        .catch(() => {});
    }

    this.ordersGateway.server.emit('orderUpdated', order);
    return order;
  }

  async remove(id: string) {
    return await this.prismaService.order.delete({
      where: { id },
    });
  }
}
