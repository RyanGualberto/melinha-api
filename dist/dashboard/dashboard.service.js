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
    async findAll() {
        const totalClients = await this.prismaService.user.count({
            where: { role: 'user' },
        });
        const now = new Date();
        const last30Days = new Date();
        last30Days.setDate(now.getDate() - 30);
        const lastFriday = new Date();
        const currentDay = now.getDay();
        const daysSinceFriday = ((currentDay + 1) % 7) + 1;
        lastFriday.setDate(now.getDate() - daysSinceFriday);
        lastFriday.setHours(0, 0, 0, 0);
        const mondayAt2AM = new Date(lastFriday);
        mondayAt2AM.setDate(lastFriday.getDate() + 3);
        mondayAt2AM.setHours(2, 0, 0, 0);
        const ordersLast30Days = await this.prismaService.order.count({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: { gte: last30Days },
            },
        });
        const ordersLastWeekend = await this.prismaService.order.count({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: { gte: lastFriday, lte: mondayAt2AM },
            },
        });
        const revenueLast30Days = await this.prismaService.order.aggregate({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: { gte: last30Days },
            },
            _sum: { total: true },
        });
        const revenueLastWeekend = await this.prismaService.order.aggregate({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: { gte: lastFriday, lte: mondayAt2AM },
            },
            _sum: { total: true },
        });
        const bestWorstSellingItemLast30Days = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: { gte: last30Days },
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 1,
        });
        const leastSellingItemLast30Days = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: { gte: last30Days },
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'asc' } },
            take: 1,
        });
        const bestWorstSellingItemLastWeekend = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: { gte: lastFriday, lte: mondayAt2AM },
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 1,
        });
        const leastSellingItemLastWeekend = await this.prismaService.orderProduct.groupBy({
            by: ['productTitleSnapshot'],
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: { gte: lastFriday, lte: mondayAt2AM },
                },
            },
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'asc' } },
            take: 1,
        });
        const addressWithOrdersLast30Days = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: {
                    gte: last30Days,
                },
                addressId: {
                    not: null,
                },
            },
            select: {
                addressSnapshot: true,
            },
        });
        const districtCountLast30Days = {};
        addressWithOrdersLast30Days.forEach((order) => {
            try {
                const address = JSON.parse(order.addressSnapshot);
                const district = address.district;
                if (district) {
                    districtCountLast30Days[district] =
                        (districtCountLast30Days[district] || 0) + 1;
                }
            }
            catch (error) {
                console.error('Erro ao parsear addressSnapshot:', error);
            }
        });
        const sortedDistrictsLast30Days = Object.entries(districtCountLast30Days).sort((a, b) => b[1] - a[1]);
        const bestWorstSellingNeighborhoodLast30Days = sortedDistrictsLast30Days[0] || ['Nenhum', 0];
        const leastSellingNeighborhoodLast30Days = sortedDistrictsLast30Days[sortedDistrictsLast30Days.length - 1] || ['Nenhum', 0];
        const addressWithOrdersLastWeekend = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: {
                    gte: lastFriday,
                    lte: mondayAt2AM,
                },
                addressId: {
                    not: null,
                },
            },
            select: {
                addressSnapshot: true,
            },
        });
        const districtCountLastWeekend = {};
        addressWithOrdersLastWeekend.forEach((order) => {
            try {
                const address = JSON.parse(order.addressSnapshot);
                const district = address.district;
                if (district) {
                    districtCountLastWeekend[district] =
                        (districtCountLastWeekend[district] || 0) + 1;
                }
            }
            catch (error) {
                console.error('Erro ao parsear addressSnapshot:', error);
            }
        });
        const sortedDistrictsLastWeekend = Object.entries(districtCountLastWeekend).sort((a, b) => b[1] - a[1]);
        const bestWorstSellingNeighborhoodLastWeekend = sortedDistrictsLastWeekend[0] || ['Nenhum', 0];
        const leastSellingNeighborhoodLastWeekend = sortedDistrictsLastWeekend[sortedDistrictsLastWeekend.length - 1] || ['Nenhum', 0];
        const orderProductsLast30Days = await this.prismaService.orderProduct.findMany({
            where: {
                order: {
                    status: {
                        not: client_1.OrderStatus.CANCELED,
                    },
                    createdAt: {
                        gte: last30Days,
                    },
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
        const ordersLast30DaysWithDeliveryCost = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: {
                    gte: last30Days,
                },
            },
            select: {
                deliveryCost: true,
            },
        });
        let totalCost = 0;
        orderProductsLast30Days.forEach((op) => {
            totalCost += (op.product?.cost || 0) * op.quantity;
        });
        let totalDeliveryCost = 0;
        ordersLast30DaysWithDeliveryCost.forEach((order) => {
            totalDeliveryCost += order.deliveryCost || 0;
        });
        const ordersForWorkedDays = await this.prismaService.order.findMany({
            where: {
                status: {
                    not: client_1.OrderStatus.CANCELED,
                },
                createdAt: {
                    gte: last30Days,
                },
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
        const totalRevenue = revenueLast30Days._sum.total || 0;
        const realProfit = totalRevenue - totalCost - totalDeliveryCostMoreDeliveryFixedTotalCost;
        return {
            averageTicket: (revenueLast30Days._sum.total || 0) / ordersLast30Days,
            totalClients,
            ordersLast30Days,
            ordersLastWeekend,
            revenueLast30Days: revenueLast30Days._sum.total || 0,
            revenueLastWeekend: revenueLastWeekend._sum.total || 0,
            bestSellingItemLast30Days: bestWorstSellingItemLast30Days[0] || null,
            leastSellingItemLast30Days: leastSellingItemLast30Days[0] || null,
            bestSellingItemLastWeekend: bestWorstSellingItemLastWeekend[0] || null,
            leastSellingItemLastWeekend: leastSellingItemLastWeekend[0] || null,
            bestSellingNeighborhoodLast30Days: bestWorstSellingNeighborhoodLast30Days,
            leastSellingNeighborhoodLast30Days: leastSellingNeighborhoodLast30Days,
            bestWorstSellingNeighborhoodLastWeekend: bestWorstSellingNeighborhoodLastWeekend,
            leastSellingNeighborhoodLastWeekend: leastSellingNeighborhoodLastWeekend,
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