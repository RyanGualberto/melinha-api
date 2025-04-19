import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
export declare class ProductVariantCategoriesController {
    private readonly productVariantCategoriesService;
    constructor(productVariantCategoriesService: ProductVariantCategoriesService);
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
