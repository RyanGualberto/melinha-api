import { ProductVariantStatus } from '@prisma/client';
export declare class CreateProductVariantDto {
    name: string;
    price: number;
    status: ProductVariantStatus;
    productId: string;
    productVariantCategoryId: string;
    image: string;
}
