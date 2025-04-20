import { PrismaService } from '../config/prisma-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { OrdersGateway } from './orders.gateway';
import { SettingsService } from 'src/settings/settings.service';
import { MailService } from '../mail/mail.service';
export declare class OrdersService {
    private prismaService;
    private ordersGateway;
    private readonly settingsService;
    private readonly mailService;
    constructor(prismaService: PrismaService, ordersGateway: OrdersGateway, settingsService: SettingsService, mailService: MailService);
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
    }>;
    findAllPaginated({ page, perPage, customerName, status, deliveryMethod, paymentMethod, period, }: {
        page?: number;
        perPage?: number;
        customerName?: string;
        status?: 'all' | keyof typeof OrderStatus;
        deliveryMethod?: 'delivery' | 'withdrawal' | 'all';
        paymentMethod?: 'all' | 'money' | 'card' | 'pix';
        period?: 'all' | 'today' | 'yesterday' | 'last3Days' | 'lastMonth';
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
    }>;
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
