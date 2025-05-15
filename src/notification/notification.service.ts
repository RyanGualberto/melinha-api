import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import * as webpush from 'web-push';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      throw new Error('As chaves VAPID não estão configuradas');
    }

    webpush.setVapidDetails(
      'mailto:admin@melinha.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  private validateEndpoint(endpoint: string): string {
    if (!endpoint.startsWith('https://fcm.googleapis.com/')) {
      return endpoint;
    }

    // Se o endpoint estiver no formato antigo, converte para o novo formato
    if (endpoint.includes('/fcm/send/')) {
      return endpoint.replace('/fcm/send/', '/wp/');
    }

    return endpoint;
  }

  private async cleanupInvalidSubscriptions() {
    try {
      await this.prisma.pushSubscription.deleteMany({});
      console.log(
        'Todas as inscrições antigas foram removidas devido a erro de credenciais VAPID',
      );
    } catch (error) {
      console.error('Erro ao limpar inscrições antigas:', error);
    }
  }

  async sendPush(title: string, message: string) {
    const subscriptions = await this.prisma.pushSubscription.findMany();

    if (subscriptions.length === 0) {
      console.log('Nenhuma inscrição push encontrada');
      return;
    }

    let hasVapidError = false;

    for (const sub of subscriptions) {
      try {
        const validEndpoint = this.validateEndpoint(sub.endpoint);

        // Se o endpoint foi corrigido, atualiza no banco de dados
        if (validEndpoint !== sub.endpoint) {
          await this.prisma.pushSubscription.update({
            where: { id: sub.id },
            data: { endpoint: validEndpoint },
          });
        }

        await webpush.sendNotification(
          {
            endpoint: validEndpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          JSON.stringify({ title, message }),
        );
        console.log('Notificação enviada com sucesso');
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        if (
          error instanceof Error &&
          'statusCode' in error &&
          error.statusCode === 403 &&
          'body' in error &&
          typeof error.body === 'string' &&
          error.body.includes('VAPID credentials')
        ) {
          hasVapidError = true;
          continue;
        }
        // Remove inscrições inválidas (404 - não encontrada, 410 - expirada)
        if (
          error instanceof Error &&
          'statusCode' in error &&
          (error.statusCode === 404 || error.statusCode === 410)
        ) {
          try {
            await this.prisma.pushSubscription.delete({
              where: { id: sub.id },
            });
            console.log(`Inscrição removida: ${sub.endpoint}`);
          } catch (deleteError) {
            console.error('Erro ao remover inscrição:', deleteError);
          }
        }
      }
    }

    // Se encontrou erro de credenciais VAPID, limpa todas as inscrições antigas
    if (hasVapidError) {
      await this.cleanupInvalidSubscriptions();
    }
  }
}
