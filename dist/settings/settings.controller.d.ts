import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
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
    update(updateSettingDto: UpdateSettingsDto): Promise<{
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
