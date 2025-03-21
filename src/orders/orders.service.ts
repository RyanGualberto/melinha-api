import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersGateway } from './orders.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private ordersGateway: OrdersGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.prismaService.order.create({
      data: {
        userId: createOrderDto.userId,
        addressId: createOrderDto.addressId,
        observation: createOrderDto.orderObservation,
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
                product: productData,
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

  async listUserOrders(userId: string) {
    return await this.prismaService.order.findMany({
      where: {
        userId,
      },
      include: {
        products: {
          include: {
            variants: true,
          },
        },
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
    return await this.prismaService.order.update({
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
  }

  async remove(id: string) {
    return await this.prismaService.order.delete({
      where: { id },
    });
  }
}
