import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { PrismaService } from '../config/prisma-service';
import { OrdersController } from './orders.controller';
import { SettingsService } from 'src/settings/settings.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway, PrismaService, SettingsService],
})
export class OrdersModule {}
