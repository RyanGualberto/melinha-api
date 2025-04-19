import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../config/prisma-service';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            name: string;
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
            id: string;
            status: import(".prisma/client").$Enums.CategoryStatus;
            name: string;
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
