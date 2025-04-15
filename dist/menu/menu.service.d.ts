import { PrismaService } from 'src/config/prisma-service';
export declare class MenuService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getMenu(query: string): Promise<{
        categories: ({
            products: ({
                productVariants: ({
                    productVariantCategory: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        max: number | null;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                    };
                } & {
                    id: string;
                    name: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    image: string;
                    productId: string;
                    productVariantCategoryId: string | null;
                })[];
            } & {
                id: string;
                description: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                price: number;
                image: string;
                categoryId: string;
                cost: number;
            })[];
        } & {
            id: string;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.CategoryStatus;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    getAdminMenu(): Promise<{
        categories: ({
            products: ({
                productVariants: ({
                    productVariantCategory: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        max: number | null;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                    };
                } & {
                    id: string;
                    name: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    image: string;
                    productId: string;
                    productVariantCategoryId: string | null;
                })[];
            } & {
                id: string;
                description: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                price: number;
                image: string;
                categoryId: string;
                cost: number;
            })[];
        } & {
            id: string;
            name: string;
            description: string | null;
            status: import(".prisma/client").$Enums.CategoryStatus;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
}
