import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/config/prisma-service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMenu(query: string) {
    const categories = await this.prismaService.category.findMany({
      select: {
        id: true,
        index: true,
        name: true,
        description: true,
        status: true,
        products: {
          where: {
            status: {
              not: ProductStatus.INACTIVE,
            },
            title: { contains: query, mode: 'insensitive' },
          },
          select: {
            image: true,
            description: true,
            id: true,
            price: true,
            status: true,
            title: true,
            index: true,
            productVariants: {
              where: {
                status: {
                  not: ProductStatus.INACTIVE,
                },
              },
              select: {
                id: true,
                productId: true,
                name: true,
                price: true,
                status: true,
                productVariantCategoryId: true,
                productVariantCategory: {
                  select: {
                    id: true,
                    name: true,
                    max: true,
                    type: true,
                  },
                },
              },
            },
          },
          orderBy: {
            index: 'asc',
          },
        },
      },
      where: {
        status: {
          not: ProductStatus.INACTIVE,
        },
      },
      orderBy: {
        index: 'asc',
      },
    });

    return { categories };
  }

  async getAdminMenu() {
    const categories = await this.prismaService.category.findMany({
      include: {
        products: {
          include: {
            productVariants: {
              include: {
                productVariantCategory: true,
              },
            },
          },
          orderBy: {
            index: 'asc',
          },
        },
      },
      orderBy: {
        index: 'asc',
      },
    });

    return { categories };
  }
}
