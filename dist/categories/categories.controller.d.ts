import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProductStatus;
            title: string;
            description: string;
            price: number;
            image: string;
            cost: number;
            categoryId: string;
            index: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProductStatus;
            title: string;
            description: string;
            price: number;
            image: string;
            cost: number;
            categoryId: string;
            index: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    }>;
    updateOrder(updateCategoryOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    }[]>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        name: string;
        description: string | null;
        index: number;
    }>;
}
