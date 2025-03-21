import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    if (createAddressDto.principal) {
      await this.setPrincipalAddress(userId, null);
    }
    return this.prismaService.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prismaService.address.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return await this.prismaService.address.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto) {
    if (updateAddressDto.principal) {
      await this.setPrincipalAddress(userId, id);
    }

    return await this.prismaService.address.update({
      where: {
        id,
        userId,
      },
      data: {
        ...updateAddressDto,
      },
    });
  }

  async remove(id: string, userId: string) {
    return await this.prismaService.address.delete({
      where: {
        id,
        userId,
      },
    });
  }

  private async setPrincipalAddress(userId: string, addressId: string) {
    await this.prismaService.address.updateMany({
      where: {
        userId,
        principal: true,
      },
      data: {
        principal: false,
      },
    });

    if (addressId)
      await this.prismaService.address.update({
        where: {
          id: addressId,
        },
        data: {
          principal: true,
        },
      });
  }
}
