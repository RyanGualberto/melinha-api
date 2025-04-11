import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
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
    update(updateSettingDto: UpdateSettingsDto): Promise<{
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
