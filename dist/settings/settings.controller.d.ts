import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findOne(): Promise<{
        id: string;
        deliveryTime: number;
        instagram: string;
        whatsapp: string;
        email: string;
        opened: boolean;
        orderMinimum: number;
    }>;
    update(updateSettingDto: UpdateSettingsDto): Promise<{
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
