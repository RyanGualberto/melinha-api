import { ProductVariantCategoriesService } from './product-variant-categories.service';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';
export declare class ProductVariantCategoriesController {
    private readonly productVariantCategoriesService;
    constructor(productVariantCategoriesService: ProductVariantCategoriesService);
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
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
        max: number;
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
