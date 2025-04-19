import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    createOrderDto.userId = req.user.id;
    createOrderDto.userSnapshot = JSON.stringify(req.user);
    return await this.ordersService.create(createOrderDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('customerName') customerName: string,
    @Query('status') status: 'all' | keyof typeof OrderStatus,
    @Query('paymentMethod') paymentMethod: 'all' | 'money' | 'card' | 'pix',
    @Query('deliveryMethod') deliveryMethod: 'delivery' | 'withdrawal' | 'all',
    @Query('period')
    period: 'all' | 'today' | 'yesterday' | 'last3Days' | 'lastMonth',
  ) {
    return await this.ordersService.findAllPaginated({
      page: Number(page),
      perPage: Number(perPage),
      customerName: customerName,
      deliveryMethod,
      paymentMethod,
      period,
      status,
    });
  }

  @UseGuards(AdminGuard)
  @Get('in-progress')
  async findOrdersInProgress() {
    return await this.ordersService.findOrdersInProgress();
  }

  @UseGuards(AdminGuard)
  @Get('new')
  async findNewOrders() {
    return await this.ordersService.findNewOrders();
  }

  @UseGuards(AuthGuard)
  @Get('current-user')
  async listUserOrders(@Req() req: Request) {
    return await this.ordersService.listUserOrders(req.user?.id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
