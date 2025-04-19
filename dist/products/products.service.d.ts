import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        title: string;
        description: string;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
    }>;
    findAll(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        price: number;
        title: string;
        image: string;
        cost: number;
        category: {
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string;
            name: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        price: number;
        title: string;
        image: string;
        cost: number;
        category: {
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            description: string;
            name: string;
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        title: string;
        description: string;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
    }>;
    updateOrder(updateProductOrderDto: {
        id: string;
        index: number;
    }[]): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        title: string;
        description: string;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        title: string;
        description: string;
        image: string;
        categoryId: string;
        cost: number;
        index: number;
    }>;
}
