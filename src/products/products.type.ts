import { ICategory } from 'src/categories/categories.type';

export interface IProduct {
  title: string;
  description: string;
  price: number;
  status: string;
  image: string;
  category?: ICategory;
  // productVariants ProductVariant[]
  // orderItem       OrderItem[]
  createdAt: Date;
  updatedAt: Date;
}
