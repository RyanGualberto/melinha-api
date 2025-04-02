import { Injectable } from '@nestjs/common';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class ProductVariantCategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductVariantCategoryDto: CreateProductVariantCategoryDto,
  ) {
    return await this.prismaService.productVariantCategory.create({
      data: {
        ...createProductVariantCategoryDto,
        max: createProductVariantCategoryDto.max || null,
      },
    });
  }

  async findAll() {
    return await this.prismaService.productVariantCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.productVariantCategory.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateProductVariantCategoryDto: UpdateProductVariantCategoryDto,
  ) {
    await this.prismaService.productVariantCategory.update({
      where: { id },
      data: {
        ...updateProductVariantCategoryDto,
        max: updateProductVariantCategoryDto.max || null,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.productVariantCategory.delete({
      where: { id },
    });
  }
}
