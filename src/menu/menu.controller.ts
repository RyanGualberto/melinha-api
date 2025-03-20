import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Query('query') query: string) {
    return await this.menuService.getMenu(query);
  }
}
