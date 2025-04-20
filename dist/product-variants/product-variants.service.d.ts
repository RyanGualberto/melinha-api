import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductVariantsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findAll(): Promise<{
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
    }[]>;
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
