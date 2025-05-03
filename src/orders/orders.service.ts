import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersGateway } from './orders.gateway';
import { SettingsService } from '../settings/settings.service';
import { MailService } from '../mail/mail.service';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private ordersGateway: OrdersGateway,
    private readonly settingsService: SettingsService,
    private readonly mailService: MailService,
    private readonly pusherService: PusherService,
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
    await this.pusherService.trigger('orders', 'orderCreated', order).then(
      () => {
        console.log('Pusher triggered');
      },
      (error) => {
        console.error('Pusher error:', error);
      },
    );
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
      function getExpedientRange(daysAgo: number) {
        const now = new Date();

        // Força horário de Brasília (UTC-3) manualmente
        const start = new Date(now);
        start.setUTCDate(start.getUTCDate() - daysAgo);
        start.setUTCHours(13, 0, 0, 0); // 10h BR = 13h UTC

        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);
        end.setUTCHours(5, 0, 0, 0); // 2h BR = 5h UTC

        return { start, end };
      }

      switch (period) {
        case 'today': {
          const { start, end } = getExpedientRange(0);
          filters.createdAt = { gte: start, lt: end };
          break;
        }

        case 'yesterday': {
          const { start, end } = getExpedientRange(1);
          filters.createdAt = { gte: start, lt: end };
          break;
        }

        case 'last3Days': {
          const { start } = getExpedientRange(2);
          const now = new Date();
          const end = new Date(now);
          end.setUTCDate(end.getUTCDate() + 1);
          end.setUTCHours(5, 0, 0, 0); // 2h BR = 5h UTC
          filters.createdAt = { gte: start, lt: end };
          break;
        }

        case 'lastMonth': {
          const start = new Date();
          start.setUTCMonth(start.getUTCMonth() - 1);
          start.setUTCHours(13, 0, 0, 0); // 10h BR = 13h UTC

          const end = new Date();
          end.setUTCDate(end.getUTCDate() + 1);
          end.setUTCHours(5, 0, 0, 0); // 2h BR = 5h UTC

          filters.createdAt = { gte: start, lt: end };
          break;
        }
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
    const localOffset = now.getTimezoneOffset() * 60000; // diferença local em ms
    const startDate = new Date(Date.now() - localOffset);
    startDate.setHours(10, 0, 0, 0); // 10h da manhã
    const endDate = new Date(Date.now() - localOffset);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(2, 0, 0, 0); // 2h da manhã do dia seguinte
    // Se o horário atual for menor que 10h, ajusta o período para o dia anterior
    if (now.getHours() < 10) {
      startDate.setDate(startDate.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1);
    }
    // Se o horário atual for maior que 2h, ajusta o período para o dia atual
    if (now.getHours() >= 2) {
      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);
    }
    // Se o horário atual for maior que 2h, ajusta o período para o dia atual
    if (now.getHours() >= 2) {
      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);
    }

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
    await this.pusherService
      .trigger(`orders_user_${order.userId}`, 'orderUpdated', order)
      .then(
        () => {
          console.log('Pusher triggered');
        },
        (error) => {
          console.error('Pusher error:', error);
        },
      );
    return order;
  }

  async remove(id: string) {
    return await this.prismaService.order.delete({
      where: { id },
    });
  }
}
