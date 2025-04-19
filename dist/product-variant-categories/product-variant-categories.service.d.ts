import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductVariantCategoriesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createProductVariantCategoryDto: CreateProductVariantCategoryDto): Promise<{
        id: string;
        name: string;
        max: number | null;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        max: number;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        max: number;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
    }>;
    update(id: string, updateProductVariantCategoryDto: UpdateProductVariantCategoryDto): Promise<void>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        max: number | null;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
