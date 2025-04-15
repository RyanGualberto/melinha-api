import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsController {
    private readonly productVariantsService;
    constructor(productVariantsService: ProductVariantsService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
    findAll(): Promise<({
        product: {
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
        };
        productVariantCategory: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.ProductVariantCategoryType;
            max: number | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        product: {
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
        };
        productVariantCategory: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.ProductVariantCategoryType;
            max: number | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
}
