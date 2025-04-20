import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
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
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
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
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        description: string | null;
        index: number;
    }>;
    updateOrder(updateCategoryOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        description: string | null;
        index: number;
    }[]>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        description: string | null;
        index: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.CategoryStatus;
        description: string | null;
        index: number;
    }>;
}
