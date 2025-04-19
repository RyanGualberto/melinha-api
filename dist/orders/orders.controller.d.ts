import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { OrderStatus } from '@prisma/client';
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
    findAll(page: string, perPage: string, customerName: string, status: 'all' | keyof typeof OrderStatus, paymentMethod: 'all' | 'money' | 'card' | 'pix', deliveryMethod: 'delivery' | 'withdrawal' | 'all', period: 'all' | 'today' | 'yesterday' | 'last3Days' | 'lastMonth'): Promise<{
        data: {
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
        }[];
        pagination: {
            page: number;
            perPage: number;
            total: number;
        };
        totals: {
            deliveryCost: number;
            totalSales: number;
        };
    }>;
    findOrdersInProgress(): Promise<{
        waiting: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                firstName: string;
                lastName: string;
                phoneNumber: string;
                password: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
            };
            address: {
                number: string;
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                name: string;
                complement: string | null;
                reference: string | null;
                district: string;
                city: string;
                state: string;
                country: string;
                zipCode: string;
                principal: boolean;
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
        })[];
        inProgress: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                firstName: string;
                lastName: string;
                phoneNumber: string;
                password: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
            };
            address: {
                number: string;
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                name: string;
                complement: string | null;
                reference: string | null;
                district: string;
                city: string;
                state: string;
                country: string;
                zipCode: string;
                principal: boolean;
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
        })[];
        inDelivery: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                firstName: string;
                lastName: string;
                phoneNumber: string;
                password: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
            };
            address: {
                number: string;
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                name: string;
                complement: string | null;
                reference: string | null;
                district: string;
                city: string;
                state: string;
                country: string;
                zipCode: string;
                principal: boolean;
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
        })[];
    }>;
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
