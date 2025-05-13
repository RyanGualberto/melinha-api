import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { PrismaService } from '../config/prisma-service';
import { OrdersController } from './orders.controller';
import { SettingsService } from '../settings/settings.service';
import { MailService } from '../mail/mail.service';
import { PusherService } from '../pusher/pusher.service';
import { FirebaseService } from '../firebase/firebase-service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersGateway,
    PrismaService,
    SettingsService,
    MailService,
    PusherService,
    FirebaseService,
  ],
})
export class OrdersModule {}
