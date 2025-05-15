import { Module } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { PrismaService } from '../config/prisma-service';
import { NotificationsController } from './notification.controller';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService],
})
export class NotificationsModule {}
