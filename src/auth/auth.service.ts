import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
      return null;
    }

    const isPasswordMatch = await this.usersService.comparePassword(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      return null;
    }

    return {
      user,
      accessToken: await this.generateToken(user),
    };
  }

  private async generateToken(user: User) {
    const payload = { sub: user.id, user };
    return await this.jwtService.signAsync(payload);
  }
}
