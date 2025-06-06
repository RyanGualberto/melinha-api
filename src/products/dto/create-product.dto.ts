import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
  image: string;
  cost: number;
  categoryId: string;
}
