import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: Request, createOrderDto: CreateOrderDto): Promise<{
        products: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                variantName: string;
                variantPrice: number;
                orderProductId: string;
            }[];
        } & {
            id: string;
            observation: string | null;
            createdAt: Date;
            updatedAt: Date;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            price: number;
            productId: string;
            productVariantId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        addressId: string | null;
        isWithdrawal: boolean | null;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue | null;
        userSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string | null;
        total: number;
        discount: number | null;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        isWithdrawal: boolean;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue;
        userSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string;
        total: number;
        discount: number;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number;
        createdAt: Date;
        products: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                variantName: string;
                variantPrice: number;
                orderProductId: string;
            }[];
        } & {
            id: string;
            observation: string | null;
            createdAt: Date;
            updatedAt: Date;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            price: number;
            productId: string;
            productVariantId: string | null;
            orderId: string;
        })[];
    }[]>;
    findNewOrders(): Promise<{
        id: string;
        isWithdrawal: boolean;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue;
        userSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string;
        total: number;
        discount: number;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number;
        createdAt: Date;
        products: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                variantName: string;
                variantPrice: number;
                orderProductId: string;
            }[];
        } & {
            id: string;
            observation: string | null;
            createdAt: Date;
            updatedAt: Date;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            price: number;
            productId: string;
            productVariantId: string | null;
            orderId: string;
        })[];
    }[]>;
    listUserOrders(req: Request): Promise<{
        id: string;
        isWithdrawal: boolean;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string;
        total: number;
        discount: number;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number;
        createdAt: Date;
        products: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                variantName: string;
                variantPrice: number;
                orderProductId: string;
            }[];
        } & {
            id: string;
            observation: string | null;
            createdAt: Date;
            updatedAt: Date;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            price: number;
            productId: string;
            productVariantId: string | null;
            orderId: string;
        })[];
    }[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        products: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                variantName: string;
                variantPrice: number;
                orderProductId: string;
            }[];
        } & {
            id: string;
            observation: string | null;
            createdAt: Date;
            updatedAt: Date;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            price: number;
            productId: string;
            productVariantId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        addressId: string | null;
        isWithdrawal: boolean | null;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue | null;
        userSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string | null;
        total: number;
        discount: number | null;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string | null;
        addressId: string | null;
        isWithdrawal: boolean | null;
        addressSnapshot: import("@prisma/client/runtime/library").JsonValue | null;
        userSnapshot: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
        observation: string | null;
        total: number;
        discount: number | null;
        deliveryTime: number;
        deliveryCost: number;
        paymentMethod: string;
        paymentChange: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
