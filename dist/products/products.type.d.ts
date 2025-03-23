import { ICategory } from '../categories/categories.type';
export interface IProduct {
    title: string;
    description: string;
    price: number;
    status: string;
    image: string;
    category?: ICategory;
    createdAt: Date;
    updatedAt: Date;
}
