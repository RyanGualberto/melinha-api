import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AdminGuard } from 'src/auth/auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AdminGuard)
  @Get()
  async findAll(
    @Query('from') from: string | undefined,
    @Query('to') to: string | undefined,
  ) {
    return await this.dashboardService.findAll({ from, to });
  }
}
