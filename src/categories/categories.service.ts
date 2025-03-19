import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prismaService.category.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
