import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenu(query: string): Promise<{
        categories: {
            id: string;
            name: string;
            description: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            index: number;
            products: {
                id: string;
                description: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                index: number;
                title: string;
                price: number;
                image: string;
                productVariants: {
                    id: string;
                    name: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    price: number;
                    productId: string;
                    productVariantCategoryId: string;
                    productVariantCategory: {
                        id: string;
                        name: string;
                        max: number;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                    };
                }[];
            }[];
        }[];
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
                index: number;
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
            index: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
}
