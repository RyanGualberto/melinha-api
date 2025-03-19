import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        categoryId: createProductDto.categoryId,
      },
    });
  }

  async findAll() {
    return this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
