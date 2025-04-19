import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
}
