"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
const client_1 = require("@prisma/client");
const orders_gateway_1 = require("./orders.gateway");
const settings_service_1 = require("../settings/settings.service");
const mail_service_1 = require("../mail/mail.service");
const pusher_service_1 = require("../pusher/pusher.service");
let OrdersService = class OrdersService {
    constructor(prismaService, ordersGateway, settingsService, mailService, pusherService) {
        this.prismaService = prismaService;
        this.ordersGateway = ordersGateway;
        this.settingsService = settingsService;
        this.mailService = mailService;
        this.pusherService = pusherService;
    }
    async create(createOrderDto) {
        const storeSettings = await this.settingsService.findOne();
        if (!storeSettings.opened) {
            throw new common_1.BadRequestException('Store is closed');
        }
        if (createOrderDto.couponId) {
            const coupon = await this.prismaService.coupon.findUnique({
                where: { id: createOrderDto.couponId },
            });
            if (!coupon) {
                throw new common_1.BadRequestException('Coupon not found');
            }
            if (coupon.expiresAt < new Date()) {
                throw new common_1.BadRequestException('Coupon expired');
            }
            if (coupon.usedCount >= coupon.maxUses) {
                throw new common_1.BadRequestException('Coupon max uses reached');
            }
            await this.prismaService.coupon.update({
                where: { id: coupon.id },
                data: { usedCount: coupon.usedCount + 1 },
            });
        }
        const order = await this.prismaService.order.create({
            data: {
                userId: createOrderDto.userId,
                addressId: createOrderDto.isWithdrawal
                    ? null
                    : createOrderDto.addressId,
                observation: createOrderDto.orderObservation,
                isWithdrawal: createOrderDto.isWithdrawal,
                products: {
                    create: await Promise.all(createOrderDto.products.map(async (product) => {
                        const productData = await this.prismaService.product.findUnique({
                            where: { id: product.productId },
                        });
                        if (!productData) {
                            console.log('product Data not found');
                        }
                        return {
                            observation: product.productObservation,
                            productId: product.productId,
                            quantity: product.quantity,
                            price: product.price,
                            productTitleSnapshot: productData.title,
                            productPriceSnapshot: product.price,
                            variants: {
                                create: product.variants.map((variant) => ({
                                    variantName: variant.variantName,
                                    variantPrice: variant.variantPrice,
                                })),
                            },
                        };
                    })),
                },
                status: client_1.OrderStatus.PENDING,
                total: createOrderDto.total,
                discount: createOrderDto.discount,
                deliveryCost: createOrderDto.deliveryCost,
                paymentMethod: createOrderDto.paymentMethod,
                paymentChange: createOrderDto.paymentChange,
                addressSnapshot: createOrderDto.addressSnapshot,
                deliveryTime: storeSettings.deliveryTime,
                userSnapshot: createOrderDto.userSnapshot,
                couponId: createOrderDto.couponId,
                new: true,
            },
            include: {
                products: {
                    include: {
                        variants: true,
                    },
                },
            },
        });
        this.ordersGateway.server.emit('orderCreated', order);
        await this.pusherService.trigger('orders', 'orderCreated', order).then(() => {
            console.log('Pusher triggered');
        }, (error) => {
            console.error('Pusher error:', error);
        });
        return order;
    }
    async findAllPaginated({ page = 1, perPage = 10, customerName, status, deliveryMethod, paymentMethod, from, to, }) {
        const skip = page * perPage;
        const filters = {};
        if (status && status !== 'all') {
            filters.status = status;
        }
        if (deliveryMethod && deliveryMethod !== 'all') {
            filters.isWithdrawal = deliveryMethod === 'withdrawal';
        }
        if (paymentMethod && paymentMethod !== 'all') {
            filters.paymentMethod = paymentMethod;
        }
        if (customerName) {
            filters.user = {
                OR: [
                    {
                        firstName: {
                            contains: customerName,
                            mode: 'insensitive',
                        },
                    },
                    {
                        lastName: {
                            contains: customerName,
                            mode: 'insensitive',
                        },
                    },
                ],
            };
        }
        if (from && to) {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            fromDate.setUTCHours(13, 0, 0, 0);
            toDate.setUTCDate(toDate.getUTCDate() + 1);
            toDate.setUTCHours(5, 0, 0, 0);
            filters.createdAt = {
                gte: fromDate,
                lt: toDate,
            };
        }
        const orders = await this.prismaService.order.findMany({
            where: filters,
            skip,
            take: perPage,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                isWithdrawal: true,
                discount: true,
                observation: true,
                deliveryCost: true,
                createdAt: true,
                deliveryTime: true,
                status: true,
                total: true,
                paymentChange: true,
                paymentMethod: true,
                userSnapshot: true,
                addressSnapshot: true,
                products: {
                    include: {
                        variants: true,
                    },
                },
            },
        });
        const aggregates = await this.prismaService.order.aggregate({
            where: filters,
            _sum: {
                deliveryCost: true,
                total: true,
            },
            _count: true,
        });
        return {
            data: orders,
            pagination: {
                page,
                perPage,
                total: aggregates._count,
            },
            totals: {
                deliveryCost: aggregates._sum.deliveryCost ?? 0,
                totalSales: aggregates._sum.total ?? 0,
            },
        };
    }
    async findOrdersInProgress() {
        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60000;
        const startDate = new Date(Date.now() - localOffset);
        startDate.setHours(10, 0, 0, 0);
        const endDate = new Date(Date.now() - localOffset);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(2, 0, 0, 0);
        if (now.getHours() < 10) {
            startDate.setDate(startDate.getDate() - 1);
            endDate.setDate(endDate.getDate() - 1);
        }
        if (now.getHours() >= 2) {
            startDate.setDate(startDate.getDate() + 1);
            endDate.setDate(endDate.getDate() + 1);
        }
        if (now.getHours() >= 2) {
            startDate.setDate(startDate.getDate() + 1);
            endDate.setDate(endDate.getDate() + 1);
        }
        const orders = await this.prismaService.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
                status: {
                    in: ['PENDING', 'IN_PROGRESS', 'DELIVERY_IN_PROGRESS'],
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                products: {
                    include: {
                        variants: true,
                    },
                },
                address: true,
                user: true,
            },
        });
        const result = {
            waiting: orders.filter((o) => o.status === 'PENDING'),
            inProgress: orders.filter((o) => o.status === 'IN_PROGRESS'),
            inDelivery: orders.filter((o) => o.status === 'DELIVERY_IN_PROGRESS'),
        };
        return result;
    }
    async listUserOrders(userId) {
        return await this.prismaService.order.findMany({
            where: {
                userId,
            },
            select: {
                products: {
                    include: {
                        variants: true,
                    },
                },
                addressSnapshot: true,
                id: true,
                isWithdrawal: true,
                discount: true,
                observation: true,
                deliveryCost: true,
                createdAt: true,
                deliveryTime: true,
                status: true,
                total: true,
                paymentChange: true,
                paymentMethod: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        return await this.prismaService.order.findUnique({
            where: { id },
            include: {
                user: true,
                products: {
                    include: {
                        variants: true,
                    },
                },
            },
        });
    }
    async update(id, updateOrderDto) {
        const order = await this.prismaService.order.update({
            where: { id },
            data: {
                status: updateOrderDto.status,
            },
            include: {
                products: {
                    include: {
                        variants: true,
                    },
                },
            },
        });
        const fullOrder = await this.prismaService.order.findUnique({
            where: { id },
        });
        if (updateOrderDto.status !== client_1.OrderStatus.CANCELED) {
            this.mailService
                .sendOrderEmail(fullOrder)
                .then(() => { })
                .catch(() => { });
        }
        this.ordersGateway.server.emit('orderUpdated', order);
        await this.pusherService
            .trigger(`orders_user_${order.userId}`, 'orderUpdated', order)
            .then(() => {
            console.log('Pusher triggered');
        }, (error) => {
            console.error('Pusher error:', error);
        });
        return order;
    }
    async remove(id) {
        return await this.prismaService.order.delete({
            where: { id },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        orders_gateway_1.OrdersGateway,
        settings_service_1.SettingsService,
        mail_service_1.MailService,
        pusher_service_1.PusherService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map