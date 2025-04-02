import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenu(query: string): Promise<{
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
                categoryId: string;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        })[];
    }>;
}
