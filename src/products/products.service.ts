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
        description: createProductDto.description,
        image: createProductDto.image,
        price: createProductDto.price,
        status: createProductDto.status,
        title: createProductDto.title,
        categoryId: createProductDto.categoryId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        cost: true,
        price: true,
        status: true,
        category: {
          select: {
            id: true,
            name: true,
            status: true,
            description: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        image: true,
        title: true,
        cost: true,
        price: true,
        status: true,
        category: {
          select: {
            id: true,
            name: true,
            status: true,
            description: true,
          },
        },
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

  async updateOrder(
    updateProductOrderDto: {
      id: string;
      index: number;
    }[],
  ) {
    const promises = updateProductOrderDto.map((product) => {
      return this.prismaService.product.update({
        where: {
          id: product.id,
        },
        data: {
          index: product.index,
        },
      });
    });
    return await Promise.all(promises);
  }

  async remove(id: string) {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
