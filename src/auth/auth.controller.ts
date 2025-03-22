import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { MailService } from '../mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.register(createUserDto);
    await this.mailService.sendWelcomeEmail(
      response.user.email,
      response.user.firstName + ' ' + response.user.lastName,
    );
    return response;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(200)
  async me(@Req() req: Request) {
    const response = await this.authService.me(req.user?.id);
    return response;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }
}
