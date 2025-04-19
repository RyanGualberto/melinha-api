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

  async findAll() {
    return await this.prismaService.order.findMany({
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
    });
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
      await this.mailService.sendOrderEmail(fullOrder);
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
