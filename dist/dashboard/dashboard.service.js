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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma-service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll({ from, to, }) {
        const totalClients = await this.prismaService.user.count({
            where: { role: 'user' },
        });
        let period = undefined;
        if (from && to) {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            fromDate.setUTCHours(13, 0, 0, 0);
            toDate.setUTCDate(toDate.getUTCDate() + 1);
            toDate.setUTCHours(5, 0, 0, 0);
            period = {
                gte: fromDate,
                lt: toDate,
            };
        }
        const ordersPeriod = await this.prismaService.order.count({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: period,
            },
        });
        const revenuePeriod = await this.prismaService.order.aggregate({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: period,
            },
            _sum: { total: true },
        });
        const bestWorstSellingItemPeriod = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: period,
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 1,
        });
        const leastSellingItemPeriod = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: period,
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'asc' } },
            take: 1,
        });
        const addressWithOrdersPeriod = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: period,
                addressId: {
                    not: null,
                },
            },
            select: {
                addressSnapshot: true,
            },
        });
        const districtCountPeriod = {};
        addressWithOrdersPeriod.forEach((order) => {
            try {
                const address = JSON.parse(order.addressSnapshot);
                const district = address.district;
                if (district) {
                    districtCountPeriod[district] =
                        (districtCountPeriod[district] || 0) + 1;
                }
            }
            catch (error) {
                console.error('Erro ao parsear addressSnapshot:', error);
            }
        });
        const sortedDistrictsPeriod = Object.entries(districtCountPeriod).sort((a, b) => b[1] - a[1]);
        const bestWorstSellingNeighborhoodPeriod = sortedDistrictsPeriod[0] || [
            'Nenhum',
            0,
        ];
        const leastSellingNeighborhoodPeriod = sortedDistrictsPeriod[sortedDistrictsPeriod.length - 1] || ['Nenhum', 0];
        const orderProductsPeriod = await this.prismaService.orderProduct.findMany({
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: period,
                },
            },
            include: {
                product: {
                    select: {
                        cost: true,
                    },
                },
            },
        });
        const ordersPeriodWithDeliveryCost = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: period,
            },
            select: {
                deliveryCost: true,
            },
        });
        let totalCost = 0;
        orderProductsPeriod.forEach((op) => {
            totalCost += (op.product?.cost || 0) * op.quantity;
        });
        let totalDeliveryCost = 0;
        ordersPeriodWithDeliveryCost.forEach((order) => {
            totalDeliveryCost += order.deliveryCost || 0;
        });
        const ordersForWorkedDays = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: period,
            },
            select: {
                createdAt: true,
            },
        });
        const workedDaysSet = new Set();
        ordersForWorkedDays.forEach((order) => {
            const createdAt = new Date(order.createdAt);
            const hour = createdAt.getHours();
            if (hour < 12) {
                createdAt.setDate(createdAt.getDate() - 1);
            }
            const dateKey = createdAt.toISOString().split('T')[0];
            workedDaysSet.add(dateKey);
        });
        const totalWorkedDays = workedDaysSet.size;
        const deliveryFixedCostPerDay = 50;
        const deliveryFixedTotalCost = totalWorkedDays * deliveryFixedCostPerDay;
        const totalDeliveryCostMoreDeliveryFixedTotalCost = deliveryFixedTotalCost + totalDeliveryCost;
        const totalRevenue = revenuePeriod._sum.total || 0;
        const realProfit = totalRevenue - totalCost - totalDeliveryCostMoreDeliveryFixedTotalCost;
        return {
            averageTicket: (revenuePeriod._sum.total || 0) / ordersPeriod,
            totalClients,
            ordersPeriod,
            revenuePeriod: revenuePeriod._sum.total || 0,
            bestSellingItemPeriod: bestWorstSellingItemPeriod[0] || null,
            leastSellingItemPeriod: leastSellingItemPeriod[0] || null,
            bestSellingNeighborhoodPeriod: bestWorstSellingNeighborhoodPeriod,
            leastSellingNeighborhoodPeriod: leastSellingNeighborhoodPeriod,
            totalWorkedDays,
            deliveryFixedTotalCost,
            totalDeliveryCost,
            totalDeliveryCostMoreDeliveryFixedTotalCost,
            totalCost,
            realProfit,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map