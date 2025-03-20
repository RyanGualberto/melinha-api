import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../config/prisma-service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const salt = crypto.randomInt(0, 10);
    const hashed_password = await bcrypt.hash(data.password, salt);

    const record = await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        password: hashed_password,
        role: 'user',
      },
    });

    delete (record as Partial<User>).password;
    return record;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!record) return null;

    return record;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const record = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    return record;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async comparePassword(plainText: string, hashedPassword: string) {
    return await bcrypt.compare(plainText, hashedPassword);
  }
}
