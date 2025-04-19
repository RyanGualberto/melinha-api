import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page: string, perPage: string, clientName: string): Promise<{
        data: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
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
}
