import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        description: string;
        price: number;
        image: string;
        cost: number;
        categoryId: string;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        description: string;
        price: number;
        image: string;
        cost: number;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        description: string;
        price: number;
        image: string;
        cost: number;
        categoryId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        description: string;
        price: number;
        image: string;
        cost: number;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        description: string;
        price: number;
        image: string;
        cost: number;
        categoryId: string;
    }>;
}
