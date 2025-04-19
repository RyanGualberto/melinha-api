"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let SettingsService = class SettingsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findOne() {
        const settings = await this.prismaService.storeSettings.findFirst({
            select: {
                id: true,
                email: true,
                instagram: true,
                whatsapp: true,
                deliveryTime: true,
                orderMinimum: true,
                opened: true,
            },
        });
        if (!settings) {
            const newSettings = await this.prismaService.storeSettings.create({
                data: {
                    instagram: '',
                    whatsapp: '',
                    email: '',
                    deliveryTime: 30,
                    orderMinimum: 0,
                    opened: false,
                },
            });
            return newSettings;
        }
        return settings;
    }
    async update(updateSettingsDto) {
        const storeSettings = await this.findOne();
        if (!storeSettings) {
            throw new Error('Store settings not found');
        }
        return await this.prismaService.storeSettings.update({
            where: {
                id: storeSettings.id,
            },
            data: {
                instagram: updateSettingsDto.instagram,
                whatsapp: updateSettingsDto.whatsapp,
                email: updateSettingsDto.email,
                deliveryTime: updateSettingsDto.deliveryTime,
                orderMinimum: updateSettingsDto.orderMinimum,
                opened: updateSettingsDto.opened,
            },
        });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map