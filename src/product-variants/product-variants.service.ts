import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from '../config/prisma-service';
import { Prisma } from '@prisma/client';
import { UpdateManyProductVariantDto } from './dto/update-many-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(createProductVariantDto: CreateProductVariantDto[]) {
    return await this.prismaService.productVariant.createMany({
      data: createProductVariantDto,
    });
  }

  async create(createProductVariantDto: CreateProductVariantDto) {
    return await this.prismaService.productVariant.create({
      data: {
        image: createProductVariantDto.image,
        name: createProductVariantDto.name,
        price: createProductVariantDto.price,
        status: createProductVariantDto.status,
        productId: createProductVariantDto.productId,
        productVariantCategoryId:
          createProductVariantDto.productVariantCategoryId,
      },
    });
  }

  async findAllPaginated({
    page = 0,
    perPage = 10,
    productVariantName,
  }: {
    page?: number;
    perPage?: number;
    productVariantName?: string;
  }) {
    const skip = page * perPage;

    const where: Prisma.ProductVariantWhereInput = productVariantName
      ? {
          OR: [
            {
              name: { contains: productVariantName, mode: 'insensitive' },
            },
          ],
        }
      : undefined;

    const productVariants = await this.prismaService.productVariant.findMany({
      where: where,
      skip,
      take: perPage,
      select: {
        id: true,
        image: true,
        name: true,
        price: true,
        status: true,
        product: {
          select: {
            title: true,
          },
        },
        productVariantCategoryId: true,
        productId: true,
        productVariantCategory: {
          select: {
            name: true,
          },
        },
      },
    });

    const aggregates = await this.prismaService.productVariant.aggregate({
      where,
      _count: true,
    });

    return {
      data: productVariants,
      pagination: {
        page,
        perPage,
        total: aggregates._count,
      },
    };
  }

  async findOne(id: string) {
    return await this.prismaService.productVariant.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        price: true,
        status: true,
        product: {
          select: {
            title: true,
          },
        },
        productVariantCategory: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    return await this.prismaService.productVariant.update({
      where: {
        id,
      },
      data: updateProductVariantDto,
    });
  }

  async updateMany(
    ids: string[],
    updateProductVariantDto: UpdateManyProductVariantDto,
  ) {
    return await this.prismaService.productVariant.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: updateProductVariantDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.productVariant.delete({
      where: {
        id,
      },
    });
  }

  async removeMany(ids: string[]) {
    return await this.prismaService.productVariant.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
