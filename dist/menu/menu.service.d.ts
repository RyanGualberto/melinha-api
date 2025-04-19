import { PrismaService } from 'src/config/prisma-service';
export declare class MenuService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getMenu(query: string): Promise<{
        categories: {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            products: {
                id: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                title: string;
                description: string;
                price: number;
                image: string;
                index: number;
                productVariants: {
                    productVariantCategory: {
                        name: string;
                        id: string;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                        max: number;
                    };
                    name: string;
                    id: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    price: number;
                    productId: string;
                    productVariantCategoryId: string;
                }[];
            }[];
            description: string;
            index: number;
        }[];
    }>;
    getAdminMenu(): Promise<{
        categories: ({
            products: ({
                productVariants: ({
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
                })[];
            } & {
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
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string | null;
            index: number;
        })[];
    }>;
}
