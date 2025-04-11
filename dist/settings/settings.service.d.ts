import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../config/prisma-service';
export declare class SettingsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findOne(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        opened: boolean;
        orderMinimum: number;
    }>;
    update(updateSettingsDto: UpdateSettingsDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        opened: boolean;
        orderMinimum: number;
    }>;
}
