import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/config/prisma-service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMenu(query: string) {
    const categories = await this.prismaService.category.findMany({
      include: {
        products: {
          where: {
            status: {
              not: ProductStatus.INACTIVE,
            },
            title: { contains: query, mode: 'insensitive' },
          },
          include: {
            productVariants: {
              where: {
                status: {
                  not: ProductStatus.INACTIVE,
                },
              },
              include: {
                productVariantCategory: true,
              },
            },
          },
        },
      },
    });

    return { categories };
  }
}
