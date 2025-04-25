import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class CouponsService {
  constructor(private prismaService: PrismaService) {}
  async create(createCouponDto: CreateCouponDto) {
    return await this.prismaService.coupon.create({
      data: createCouponDto,
    });
  }

  async findAll() {
    return await this.prismaService.coupon.findMany({});
  }

  async findOne(code: string) {
    return await this.prismaService.coupon.findUnique({
      where: {
        code,
      },
    });
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    return await this.prismaService.coupon.update({
      where: {
        id,
      },
      data: updateCouponDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.coupon.delete({
      where: {
        id,
      },
    });
  }
}
