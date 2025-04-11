import { ProductStatus } from '@prisma/client';
export declare class CreateProductDto {
    title: string;
    description: string;
    price: number;
    status: ProductStatus;
    image: string;
    cost: number;
    categoryId: string;
}
