import { Injectable } from '@nestjs/common';
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
              not: 'inactive',
            },
            title: { contains: query, mode: 'insensitive' },
          },
          include: {
            productVariants: {
              where: {
                status: {
                  not: 'inactive',
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
