import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductVariantCategoriesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createProductVariantCategoryDto: CreateProductVariantCategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }>;
    update(id: string, updateProductVariantCategoryDto: UpdateProductVariantCategoryDto): Promise<void>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }>;
}
