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
        index: number;
    }>;
    findAll(): Promise<{
        category: {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string;
        };
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        price: number;
        image: string;
        cost: number;
    }[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string;
        };
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        title: string;
        price: number;
        image: string;
        cost: number;
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
        index: number;
    }>;
    updateOrder(updateProductOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
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
        index: number;
    }[]>;
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
        index: number;
    }>;
}
