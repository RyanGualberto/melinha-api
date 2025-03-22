import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  sendWelcomeEmail({ name, email }: { name: string; email: string }) {
    this.sendEmail(
      email,
      'Bem vindo à Melinha Açaíteria',
      'd-ea25be228b8d4cf9b9f9c7ec239e6dd8',
      {
        name: name,
      },
    )
      .then(() => {
        console.log('E-mail de boas-vindas enviado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao enviar o e-mail de boas-vindas', error);
      });
  }

  async sendEmail(
    to: string,
    subject: string,
    templateId: string,
    dynamicData: Record<string, string>,
  ) {
    const msg = {
      to,
      from: 'your-email@example.com',
      subject,
      templateId,
      dynamic_template_data: dynamicData,
    };

    try {
      await sgMail.send(msg);
      console.log('E-mail enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o e-mail', error);
      throw new Error('Erro ao enviar o e-mail');
    }
  }
}
