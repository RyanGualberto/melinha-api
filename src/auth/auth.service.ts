import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma-service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      user,
      accessToken: await this.generateToken(user),
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatch = await this.usersService.comparePassword(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      user,
      accessToken: await this.generateToken(user),
    };
  }

  async me(id: string) {
    const user = await this.usersService.findOne(id);
    const settings = await this.prismaService.storeSettings.findFirst();
    return { ...user, settings };
  }

  private async generateToken(user: User) {
    const payload = { sub: user.id, user };
    return await this.jwtService.signAsync(payload, {
      privateKey: String(process.env.JWT_SECRET),
      expiresIn: '1d',
    });
  }
}
