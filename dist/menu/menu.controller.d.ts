import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenu(query: string): Promise<{
        categories: {
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
                        id: string;
                        name: string;
                        type: import(".prisma/client").$Enums.ProductVariantCategoryType;
                        max: number;
                    };
                    id: string;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    name: string;
                    price: number;
                    productId: string;
                    productVariantCategoryId: string;
                }[];
            }[];
            name: string;
            description: string;
            index: number;
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
                    createdAt: Date;
                    updatedAt: Date;
                    status: import(".prisma/client").$Enums.ProductVariantStatus;
                    name: string;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CategoryStatus;
            name: string;
            description: string | null;
            index: number;
        })[];
    }>;
}
