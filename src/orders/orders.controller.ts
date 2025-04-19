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
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

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
  async findAll() {
    return await this.ordersService.findAll();
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
