import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            title: string;
            description: string;
            image: string;
            categoryId: string;
            cost: number;
            index: number;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            title: string;
            description: string;
            image: string;
            categoryId: string;
            cost: number;
            index: number;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    }>;
    updateOrder(updateCategoryOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    }[]>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CategoryStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        index: number;
        name: string;
    }>;
}
