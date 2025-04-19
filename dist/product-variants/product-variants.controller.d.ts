import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsController {
    private readonly productVariantsService;
    constructor(productVariantsService: ProductVariantsService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        productId: string;
        image: string;
        name: string;
        productVariantCategoryId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        product: {
            title: string;
        };
        image: string;
        name: string;
        productVariantCategory: {
            name: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        product: {
            title: string;
        };
        image: string;
        name: string;
        productVariantCategory: {
            name: string;
        };
    }>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        productId: string;
        image: string;
        name: string;
        productVariantCategoryId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        productId: string;
        image: string;
        name: string;
        productVariantCategoryId: string | null;
    }>;
}
