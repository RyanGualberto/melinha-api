import { MailerService } from '@nestjs-modules/mailer';
import { Order } from '@prisma/client';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendOrderEmail(order: Order): Promise<void>;
    sendPasswordResetEmail(email: string, name: string, token: string): Promise<void>;
}
