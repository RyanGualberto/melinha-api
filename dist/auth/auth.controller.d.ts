import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request } from 'express';
import { MailService } from '../mail/mail.service';
export declare class AuthController {
    private readonly authService;
    private readonly mailService;
    constructor(authService: AuthService, mailService: MailService);
    register(createUserDto: CreateUserDto): Promise<{
        user: {
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
        };
        accessToken: string;
    }>;
    me(req: Request): Promise<{
        settings: {
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deliveryTime: number;
            instagram: string;
            whatsapp: string;
            opened: boolean;
            orderMinimum: number;
        };
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        password: string;
        id: string;
        role: string;
        resetToken: string | null;
        resetExpires: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginAuthDto: LoginAuthDto): Promise<{
        user: {
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
        };
        accessToken: string;
    }>;
}
