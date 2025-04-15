import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Query('query') query: string) {
    return await this.menuService.getMenu(query);
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  async getAdminMenu() {
    return await this.menuService.getAdminMenu();
  }
}
