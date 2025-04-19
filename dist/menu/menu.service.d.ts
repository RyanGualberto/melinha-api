import { PrismaService } from 'src/config/prisma-service';
export declare class MenuService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getMenu(query: string): Promise<{
        categories: {
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            products: {
                id: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                price: number;
                title: string;
                description: string;
                image: string;
                index: number;
                productVariants: {
                    id: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    price: number;
                    productId: string;
                    name: string;
                    productVariantCategory: {
                        id: string;
                        name: string;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                        max: number;
                    };
                    productVariantCategoryId: string;
                }[];
            }[];
            description: string;
            index: number;
            name: string;
        }[];
    }>;
    getAdminMenu(): Promise<{
        categories: ({
            products: ({
                productVariants: ({
                    productVariantCategory: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                        max: number | null;
                    };
                } & {
                    id: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    productId: string;
                    image: string;
                    name: string;
                    productVariantCategoryId: string | null;
                })[];
            } & {
                id: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                title: string;
                description: string;
                image: string;
                categoryId: string;
                cost: number;
                index: number;
            })[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            index: number;
            name: string;
        })[];
    }>;
}
