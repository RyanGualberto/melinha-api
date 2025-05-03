import { PrismaService } from '../config/prisma-service';
export declare class DashboardService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll({ from, to, }: {
        from: string | undefined;
        to: string | undefined;
    }): Promise<{
        averageTicket: number;
        totalClients: number;
        ordersPeriod: number;
        revenuePeriod: number;
        bestSellingItemPeriod: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        leastSellingItemPeriod: import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderProductGroupByOutputType, "productTitleSnapshot"[]> & {
            _sum: {
                quantity: number;
            };
        };
        bestSellingNeighborhoodPeriod: [string, number];
        leastSellingNeighborhoodPeriod: [string, number];
        totalWorkedDays: number;
        deliveryFixedTotalCost: number;
        totalDeliveryCost: number;
        totalDeliveryCostMoreDeliveryFixedTotalCost: number;
        totalCost: number;
        realProfit: number;
    }>;
}
