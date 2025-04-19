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
    me(req: Request): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        role: string;
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
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
