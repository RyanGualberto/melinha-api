import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersGateway } from './orders.gateway';
import { SettingsService } from '../settings/settings.service';
import { MailService } from '../mail/mail.service';
import { PusherService } from '../pusher/pusher.service';
import { NotificationsService } from '../notification/notification.service';
export declare class OrdersService {
    private prismaService;
    private ordersGateway;
    private readonly settingsService;
    private readonly mailService;
    private readonly pusherService;
    private readonly notificationsService;
    constructor(prismaService: PrismaService, ordersGateway: OrdersGateway, settingsService: SettingsService, mailService: MailService, pusherService: PusherService, notificationsService: NotificationsService);
    create(createOrderDto: CreateOrderDto): Promise<{
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
        couponId: string | null;
        new: boolean | null;
    }>;
    findAllPaginated({ page, perPage, customerName, status, deliveryMethod, paymentMethod, from, to, }: {
        page?: number;
        perPage?: number;
        customerName?: string;
        status?: 'all' | keyof typeof OrderStatus;
        deliveryMethod?: 'delivery' | 'withdrawal' | 'all';
        paymentMethod?: 'all' | 'money' | 'card' | 'pix';
        from?: string | undefined;
        to?: string | undefined;
    }): Promise<{
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
            couponId: string | null;
            new: boolean | null;
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
            couponId: string | null;
            new: boolean | null;
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
            couponId: string | null;
            new: boolean | null;
        })[];
    }>;
    listUserOrders(userId: string): Promise<{
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
            product: {
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
    findOne(id: string): Promise<{
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
        couponId: string | null;
        new: boolean | null;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto, userId: string): Promise<ForbiddenException | ({
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
        couponId: string | null;
        new: boolean | null;
    })>;
    getLastOrder(userId: string): Promise<{
        products: ({
            product: {
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
        couponId: string | null;
        new: boolean | null;
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
        couponId: string | null;
        new: boolean | null;
    }>;
}
