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
        couponId: string | null;
        new: boolean | null;
    }>;
    findAll(page: string, perPage: string, customerName: string, status: 'all' | keyof typeof OrderStatus, paymentMethod: 'all' | 'money' | 'card' | 'pix', deliveryMethod: 'delivery' | 'withdrawal' | 'all', from: string, to: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
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
                firstName: string;
                lastName: string;
                phoneNumber: string;
                email: string;
                password: string;
                id: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            address: {
                number: string;
                address: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
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
            couponId: string | null;
            new: boolean | null;
        })[];
        inProgress: ({
            user: {
                firstName: string;
                lastName: string;
                phoneNumber: string;
                email: string;
                password: string;
                id: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            address: {
                number: string;
                address: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
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
            couponId: string | null;
            new: boolean | null;
        })[];
        inDelivery: ({
            user: {
                firstName: string;
                lastName: string;
                phoneNumber: string;
                email: string;
                password: string;
                id: string;
                role: string;
                resetToken: string | null;
                resetExpires: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            address: {
                number: string;
                address: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
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
            couponId: string | null;
            new: boolean | null;
        })[];
    }>;
    listUserOrders(req: Request): Promise<{
        id: string;
        createdAt: Date;
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
        products: ({
            product: {
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
            };
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
    }[]>;
    listLastOrder(req: Request): Promise<{
        products: ({
            product: {
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
            };
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
        couponId: string | null;
        new: boolean | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto, req: Request): Promise<import("@nestjs/common").ForbiddenException | ({
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
        couponId: string | null;
        new: boolean | null;
    })>;
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
        couponId: string | null;
        new: boolean | null;
    }>;
}
