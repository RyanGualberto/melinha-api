"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_gateway_1 = require("./orders.gateway");
const prisma_service_1 = require("../config/prisma-service");
const orders_controller_1 = require("./orders.controller");
const settings_service_1 = require("../settings/settings.service");
const mail_service_1 = require("../mail/mail.service");
const pusher_service_1 = require("../pusher/pusher.service");
const notification_service_1 = require("../notification/notification.service");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_service_1.OrdersService,
            orders_gateway_1.OrdersGateway,
            prisma_service_1.PrismaService,
            settings_service_1.SettingsService,
            mail_service_1.MailService,
            pusher_service_1.PusherService,
            notification_service_1.NotificationsService,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map