import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { UpdateManyProductVariantDto } from './dto/update-many-product-variant.dto';
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
    createMany(createProductVariantsDto: [CreateProductVariantDto]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    findAll(page: number, perPage: number, productVariantName: string): Promise<{
        data: {
            product: {
                title: string;
            };
            productVariantCategory: {
                name: string;
            };
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.ProductVariantStatus;
            price: number;
            image: string;
            productId: string;
            productVariantCategoryId: string;
        }[];
        pagination: {
            page: number;
            perPage: number;
            total: number;
        };
    }>;
    findOne(id: string): Promise<{
        product: {
            title: string;
        };
        productVariantCategory: {
            name: string;
        };
        name: string;
        id: string;
        status: import(".prisma/client").$Enums.ProductVariantStatus;
        price: number;
        image: string;
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
    updateMany(updateManyProductVariantDto: UpdateManyProductVariantDto & {
        ids: string[];
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
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
    removeMany(ids: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
