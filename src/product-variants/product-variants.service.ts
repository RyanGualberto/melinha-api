import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async findAll() {
    return await this.prismaService.productVariant.findMany({
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

  async remove(id: string) {
    return await this.prismaService.productVariant.delete({
      where: {
        id,
      },
    });
  }
}
