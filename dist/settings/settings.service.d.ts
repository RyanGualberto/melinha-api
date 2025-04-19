import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../config/prisma-service';
export declare class SettingsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findOne(): Promise<{
        id: string;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        email: string;
        opened: boolean;
        orderMinimum: number;
    }>;
    update(updateSettingsDto: UpdateSettingsDto): Promise<{
        id: string;
        deliveryTime: number;
        createdAt: Date;
        updatedAt: Date;
        instagram: string;
        whatsapp: string;
        email: string;
        opened: boolean;
        orderMinimum: number;
    }>;
}
