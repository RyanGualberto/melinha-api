import { IProduct } from '../products/products.type';

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  products: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}
