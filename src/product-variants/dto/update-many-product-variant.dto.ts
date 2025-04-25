import { ProductVariantStatus } from '@prisma/client';

export class UpdateManyProductVariantDto {
  price: number;
  status: ProductVariantStatus;
  productId: string;
  productVariantCategoryId: string;
}
