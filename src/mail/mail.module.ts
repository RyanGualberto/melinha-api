import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService, ConfigService],
  exports: [MailService], // exporta o M
})
export class MailModule {}
