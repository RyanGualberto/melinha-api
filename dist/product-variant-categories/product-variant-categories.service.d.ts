import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductVariantCategoriesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createProductVariantCategoryDto: CreateProductVariantCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number;
    }>;
    update(id: string, updateProductVariantCategoryDto: UpdateProductVariantCategoryDto): Promise<void>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number | null;
    }>;
}
