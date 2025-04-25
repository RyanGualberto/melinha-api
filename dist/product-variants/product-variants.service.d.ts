import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from '../config/prisma-service';
import { Prisma } from '@prisma/client';
import { UpdateManyProductVariantDto } from './dto/update-many-product-variant.dto';
export declare class ProductVariantsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createMany(createProductVariantDto: CreateProductVariantDto[]): Promise<Prisma.BatchPayload>;
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
    findAllPaginated({ page, perPage, productVariantName, }: {
        page?: number;
        perPage?: number;
        productVariantName?: string;
    }): Promise<{
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
    updateMany(ids: string[], updateProductVariantDto: UpdateManyProductVariantDto): Promise<Prisma.BatchPayload>;
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
    removeMany(ids: string[]): Promise<Prisma.BatchPayload>;
}
