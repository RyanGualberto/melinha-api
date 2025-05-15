"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
const webpush = __importStar(require("web-push"));
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
        if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
            throw new Error('As chaves VAPID não estão configuradas');
        }
        webpush.setVapidDetails('mailto:admin@melinha.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    }
    validateEndpoint(endpoint) {
        if (!endpoint.startsWith('https://fcm.googleapis.com/')) {
            return endpoint;
        }
        if (endpoint.includes('/fcm/send/')) {
            return endpoint.replace('/fcm/send/', '/wp/');
        }
        return endpoint;
    }
    async cleanupInvalidSubscriptions() {
        try {
            await this.prisma.pushSubscription.deleteMany({});
            console.log('Todas as inscrições antigas foram removidas devido a erro de credenciais VAPID');
        }
        catch (error) {
            console.error('Erro ao limpar inscrições antigas:', error);
        }
    }
    async sendPush(title, message) {
        const subscriptions = await this.prisma.pushSubscription.findMany();
        if (subscriptions.length === 0) {
            console.log('Nenhuma inscrição push encontrada');
            return;
        }
        let hasVapidError = false;
        for (const sub of subscriptions) {
            try {
                const validEndpoint = this.validateEndpoint(sub.endpoint);
                if (validEndpoint !== sub.endpoint) {
                    await this.prisma.pushSubscription.update({
                        where: { id: sub.id },
                        data: { endpoint: validEndpoint },
                    });
                }
                await webpush.sendNotification({
                    endpoint: validEndpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                }, JSON.stringify({ title, message }));
                console.log('Notificação enviada com sucesso');
            }
            catch (error) {
                console.error('Erro ao enviar notificação:', error);
                if (error instanceof Error &&
                    'statusCode' in error &&
                    error.statusCode === 403 &&
                    'body' in error &&
                    typeof error.body === 'string' &&
                    error.body.includes('VAPID credentials')) {
                    hasVapidError = true;
                    continue;
                }
                if (error instanceof Error &&
                    'statusCode' in error &&
                    (error.statusCode === 404 || error.statusCode === 410)) {
                    try {
                        await this.prisma.pushSubscription.delete({
                            where: { id: sub.id },
                        });
                        console.log(`Inscrição removida: ${sub.endpoint}`);
                    }
                    catch (deleteError) {
                        console.error('Erro ao remover inscrição:', deleteError);
                    }
                }
            }
        }
        if (hasVapidError) {
            await this.cleanupInvalidSubscriptions();
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notification.service.js.map