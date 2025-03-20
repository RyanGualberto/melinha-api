import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: {
        ...createProductDto,
      },
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
