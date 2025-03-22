import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order, User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string) {
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Seja Bem vindo à Melinha Açaíteria!',
        template: 'welcome',
        context: {
          name,
        },
      })
      .then(() => {
        console.log('E-mail enviado para', email);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async sendOrderEmail(order: Order) {
    const user: User | null =
      typeof order.userSnapshot === 'string'
        ? (JSON.parse(order.userSnapshot) as User)
        : null;

    await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Pedido realizado com sucesso!',
        template: `status-updated-${order.status.toLowerCase()}`,
        context: {
          orderId: order.id.split('-')[0],
          clientName: user.firstName + ' ' + user.lastName,
          dateTime: new Date(order.createdAt).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          }),
          total: order.total,
          deliveryTime: new Date(
            new Date(order.createdAt).getTime() + order.deliveryTime * 60000,
          ).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      })
      .then(() => {
        console.log('E-mail enviado para', user.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
