import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../config/prisma-service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<User>;
    findAllPaginated({ page, perPage, clientName, }: {
        page?: number;
        perPage?: number;
        clientName?: string;
    }): Promise<{
        data: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            id: string;
            createdAt: Date;
            orders: {
                createdAt: Date;
            }[];
        }[];
        pagination: {
            page: number;
            perPage: number;
            total: number;
        };
    }>;
    findOne(id: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        id: string;
        role: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        password: string;
        id: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        password: string;
        id: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    comparePassword(plainText: string, hashedPassword: string): Promise<boolean>;
    private maskEmail;
}
