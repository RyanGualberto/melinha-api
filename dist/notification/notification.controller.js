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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
let NotificationsController = class NotificationsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async subscribe(body) {
        const { endpoint, expirationTime, keys } = body;
        const existing = await this.prisma.pushSubscription.findUnique({
            where: { endpoint },
        });
        if (!existing) {
            await this.prisma.pushSubscription.create({
                data: {
                    endpoint,
                    expirationTime,
                    p256dh: keys.p256dh,
                    auth: keys.auth,
                },
            });
        }
        return { success: true };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "subscribe", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsController);
//# sourceMappingURL=notification.controller.js.map