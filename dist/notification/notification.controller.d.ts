import { PrismaService } from '../config/prisma-service';
export declare class NotificationsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    subscribe(body: {
        endpoint: string;
        expirationTime: string;
        keys: {
            p256dh: string;
            auth: string;
        };
    }): Promise<{
        success: boolean;
    }>;
}
