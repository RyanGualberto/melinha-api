import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../config/prisma-service';
export declare class SettingsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findOne(): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        opened: boolean;
        orderMinimum: number;
    }>;
    update(updateSettingsDto: UpdateSettingsDto): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        opened: boolean;
        orderMinimum: number;
    }>;
}
