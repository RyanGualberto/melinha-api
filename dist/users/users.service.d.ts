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
        orders: {
            createdAt: Date;
        }[];
        id: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    comparePassword(plainText: string, hashedPassword: string): Promise<boolean>;
    private maskEmail;
}
