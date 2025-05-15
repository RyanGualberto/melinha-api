// notifications.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('subscribe')
  async subscribe(
    @Body()
    body: {
      endpoint: string;
      expirationTime: string;
      keys: {
        p256dh: string;
        auth: string;
      };
    },
  ) {
    const { endpoint, expirationTime, keys } = body;

    const existing = await this.prisma.pushSubscription.findUnique({
      where: { endpoint },
    });

    if (!existing) {
      await this.prisma.pushSubscription.create({
        data: {
          endpoint,
          expirationTime,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
    }

    return { success: true };
  }
}
