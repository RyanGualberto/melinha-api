import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page: string, perPage: string, clientName: string): Promise<{
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
}
