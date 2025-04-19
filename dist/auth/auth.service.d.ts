import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../config/prisma-service';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prismaService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, prismaService: PrismaService, mailService: MailService);
    register(createUserDto: CreateUserDto): Promise<{
        user: {
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
        };
        accessToken: string;
    }>;
    login(loginAuthDto: LoginAuthDto): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
        };
        accessToken: string;
    }>;
    me(id: string): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private generateToken;
}
