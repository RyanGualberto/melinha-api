import { Injectable } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne() {
    const settings = await this.prismaService.storeSettings.findFirst();

    if (!settings) {
      const newSettings = await this.prismaService.storeSettings.create({
        data: {
          instagram: '',
          whatsapp: '',
          email: '',
          deliveryTime: '',
          orderMinimum: 0,
          opened: false,
        },
      });

      return newSettings;
    }
    return settings;
  }

  async update(updateSettingsDto: UpdateSettingsDto) {
    const storeSettings = await this.findOne();

    if (!storeSettings) {
      throw new Error('Store settings not found');
    }

    return await this.prismaService.storeSettings.update({
      where: {
        id: storeSettings.id,
      },
      data: {
        instagram: updateSettingsDto.instagram,
        whatsapp: updateSettingsDto.whatsapp,
        email: updateSettingsDto.email,
        deliveryTime: updateSettingsDto.deliveryTime,
        orderMinimum: updateSettingsDto.orderMinimum,
        opened: updateSettingsDto.opened,
      },
    });
  }
}
