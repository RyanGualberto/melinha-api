import { PrismaService } from '../config/prisma-service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private validateEndpoint;
    private cleanupInvalidSubscriptions;
    sendPush(title: string, message: string): Promise<void>;
}
