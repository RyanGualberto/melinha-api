import { Injectable } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne() {
    const settings = await this.prismaService.storeSettings.findFirst();

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
      },
    });
  }
}
