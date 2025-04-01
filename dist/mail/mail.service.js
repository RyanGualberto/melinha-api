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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendWelcomeEmail(email, name) {
        await this.mailerService
            .sendMail({
            to: email,
            subject: 'Seja Bem vindo à Melinha Açaíteria!',
            template: 'welcome',
            context: {
                name,
            },
        })
            .then(() => { })
            .catch((error) => {
            console.error(error);
        });
    }
    async sendOrderEmail(order) {
        const user = typeof order.userSnapshot === 'string'
            ? JSON.parse(order.userSnapshot)
            : null;
        await this.mailerService
            .sendMail({
            to: user.email,
            subject: 'Pedido realizado com sucesso!',
            template: `status-updated-${order.status.toLowerCase().replaceAll('_', '-')}`,
            context: {
                orderId: order.id.split('-')[0],
                clientName: user.firstName + ' ' + user.lastName,
                datetime: new Date(order.createdAt).toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                }),
                total: order.total,
                deliveryTime: new Date(new Date(order.createdAt).getTime() + order.deliveryTime * 60000).toLocaleString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo',
                }),
            },
        })
            .then(() => { })
            .catch((error) => {
            console.error(error);
        });
    }
    async sendPasswordResetEmail(email, name, token) {
        await this.mailerService
            .sendMail({
            to: email,
            subject: 'Redefinição de senha',
            template: 'reset-password',
            context: {
                clientName: name,
                token,
            },
        })
            .then(() => { })
            .catch((error) => {
            console.error(error);
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map