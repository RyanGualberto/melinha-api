import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    findAll(): Promise<{
        averageTicket: number;
        totalClients: number;
        ordersLast30Days: number;
        ordersLastWeekend: number;
        revenueLast30Days: number;
        revenueLastWeekend: number;
        bestSellingItemLast30Days: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        leastSellingItemLast30Days: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        bestSellingItemLastWeekend: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        leastSellingItemLastWeekend: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        bestSellingNeighborhoodLast30Days: [string, number];
        leastSellingNeighborhoodLast30Days: [string, number];
        bestWorstSellingNeighborhoodLastWeekend: [string, number];
        leastSellingNeighborhoodLastWeekend: [string, number];
    }>;
}
