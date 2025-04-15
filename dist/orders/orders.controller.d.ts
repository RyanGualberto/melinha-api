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
            createdAt: Date;
            updatedAt: Date;
            observation: string | null;
            orderId: string;
            price: number;
            productId: string;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            productVariantId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            password: string;
            role: string;
            resetToken: string | null;
            resetExpires: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
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
            createdAt: Date;
            updatedAt: Date;
            observation: string | null;
            orderId: string;
            price: number;
            productId: string;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            productVariantId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    })[]>;
    listUserOrders(req: Request): Promise<({
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
            createdAt: Date;
            updatedAt: Date;
            observation: string | null;
            orderId: string;
            price: number;
            productId: string;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            productVariantId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    })[]>;
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
            createdAt: Date;
            updatedAt: Date;
            observation: string | null;
            orderId: string;
            price: number;
            productId: string;
            productTitleSnapshot: string;
            productPriceSnapshot: number;
            quantity: number;
            productVariantId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
}
