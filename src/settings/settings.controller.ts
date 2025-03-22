import { Controller, Body, Patch, UseGuards, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { AdminGuard } from '../auth/auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findOne() {
    return await this.settingsService.findOne();
  }

  @UseGuards(AdminGuard)
  @Patch()
  async update(@Body() updateSettingDto: UpdateSettingsDto) {
    return await this.settingsService.update(updateSettingDto);
  }
}
