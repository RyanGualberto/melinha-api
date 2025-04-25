import { ProductVariantStatus } from '@prisma/client';
export declare class UpdateManyProductVariantDto {
    price: number;
    status: ProductVariantStatus;
    productId: string;
    productVariantCategoryId: string;
}
