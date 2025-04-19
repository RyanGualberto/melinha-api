import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../config/prisma-service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<User>;
    findAll(): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        orders: {
            createdAt: Date;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        password: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        password: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
    }>;
    comparePassword(plainText: string, hashedPassword: string): Promise<boolean>;
    private maskEmail;
}
