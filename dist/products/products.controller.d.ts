import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            description: string | null;
            status: import(".prisma/client").$Enums.CategoryStatus;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            description: string | null;
            status: import(".prisma/client").$Enums.CategoryStatus;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOrder(updateProductOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
        status: import(".prisma/client").$Enums.ProductStatus;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
