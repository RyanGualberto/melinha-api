import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
export declare class ProductVariantCategoriesController {
    private readonly productVariantCategoriesService;
    constructor(productVariantCategoriesService: ProductVariantCategoriesService);
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
        max: number | null;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        max: number | null;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        createdAt: Date;
        updatedAt: Date;
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
