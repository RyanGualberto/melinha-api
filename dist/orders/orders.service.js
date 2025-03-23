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
let OrdersService = class OrdersService {
    constructor(prismaService, ordersGateway, settingsService, mailService) {
        this.prismaService = prismaService;
        this.ordersGateway = ordersGateway;
        this.settingsService = settingsService;
        this.mailService = mailService;
    }
    async create(createOrderDto) {
        const storeSettings = await this.settingsService.findOne();
        if (!storeSettings.opened) {
            throw new common_1.BadRequestException('Store is closed');
        }
        const order = await this.prismaService.order.create({
            data: {
                userId: createOrderDto.userId,
                addressId: createOrderDto.addressId,
                observation: createOrderDto.orderObservation,
                products: {
                    create: await Promise.all(createOrderDto.products.map(async (product) => {
                        const productData = await this.prismaService.product.findUnique({
                            where: { id: product.productId },
                        });
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
        return order;
    }
    async findAll() {
        return await this.prismaService.order.findMany({
            include: {
                user: true,
                products: {
                    include: {
                        variants: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async listUserOrders(userId) {
        return await this.prismaService.order.findMany({
            where: {
                userId,
            },
            include: {
                products: {
                    include: {
                        variants: true,
                    },
                },
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
            await this.mailService.sendOrderEmail(fullOrder);
        }
        this.ordersGateway.server.emit('orderUpdated', order);
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
        mail_service_1.MailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map