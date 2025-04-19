import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsController {
    private readonly productVariantsService;
    constructor(productVariantsService: ProductVariantsService);
    create(createProductVariantDto: CreateProductVariantDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        name: string;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
    findAll(): Promise<{
        product: {
            title: string;
        };
        productVariantCategory: {
            name: string;
        };
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        name: string;
        price: number;
        image: string;
    }[]>;
    findOne(id: string): Promise<{
        product: {
            title: string;
        };
        productVariantCategory: {
            name: string;
        };
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        name: string;
        price: number;
        image: string;
    }>;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        name: string;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        name: string;
        price: number;
        image: string;
        productId: string;
        productVariantCategoryId: string | null;
    }>;
}
