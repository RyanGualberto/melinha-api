import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../config/prisma-service';
export declare class CategoriesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            description: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            price: number;
            image: string;
            categoryId: string;
            cost: number;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            description: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            price: number;
            image: string;
            categoryId: string;
            cost: number;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOrder(data: {
        id: string;
        index: number;
    }[]): Promise<{
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CategoryStatus;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
