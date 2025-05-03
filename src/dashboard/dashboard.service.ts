import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { Address, OrderStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll({
    from,
    to,
  }: {
    from: string | undefined;
    to: string | undefined;
  }) {
    const totalClients = await this.prismaService.user.count({
      where: { role: 'user' },
    });

    let period:
      | {
          gte: Date;
          lt: Date;
        }
      | undefined = undefined;

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // Ajustar para início do expediente (10h BR = 13h UTC)
      fromDate.setUTCHours(13, 0, 0, 0);

      // Ajustar para fim do expediente do dia seguinte (2h BR = 5h UTC)
      toDate.setUTCDate(toDate.getUTCDate() + 1);
      toDate.setUTCHours(5, 0, 0, 0);

      period = {
        gte: fromDate,
        lt: toDate,
      };
    }

    // Quantidade de pedidos nos períodos
    const ordersPeriod = await this.prismaService.order.count({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: period,
      },
    });

    // Valor faturado nos períodos
    const revenuePeriod = await this.prismaService.order.aggregate({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: period,
      },
      _sum: { total: true },
    });

    // Item mais e menos vendido nos últimos 30 dias
    const bestWorstSellingItemPeriod =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: period,
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 1, // Mais vendido
      });

    const leastSellingItemPeriod =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: period,
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'asc' } },
        take: 1, // Menos vendido
      });

    const addressWithOrdersPeriod = await this.prismaService.order.findMany({
      where: {
        status: {
          not: OrderStatus.CANCELED,
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

    const districtCountPeriod: Record<string, number> = {};

    addressWithOrdersPeriod.forEach((order) => {
      try {
        const address = JSON.parse(order.addressSnapshot as string) as Address;
        const district = address.district;

        if (district) {
          districtCountPeriod[district] =
            (districtCountPeriod[district] || 0) + 1;
        }
      } catch (error) {
        console.error('Erro ao parsear addressSnapshot:', error);
      }
    });

    const sortedDistrictsPeriod = Object.entries(districtCountPeriod).sort(
      (a, b) => b[1] - a[1],
    );
    const bestWorstSellingNeighborhoodPeriod = sortedDistrictsPeriod[0] || [
      'Nenhum',
      0,
    ];
    const leastSellingNeighborhoodPeriod = sortedDistrictsPeriod[
      sortedDistrictsPeriod.length - 1
    ] || ['Nenhum', 0];

    // Buscar OrderProducts dos últimos 30 dias com custo do produto
    const orderProductsPeriod = await this.prismaService.orderProduct.findMany({
      where: {
        order: {
          status: {
            not: OrderStatus.CANCELED,
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

    // Buscar Orders válidos dos últimos 30 dias para calcular o total de frete
    const ordersPeriodWithDeliveryCost =
      await this.prismaService.order.findMany({
        where: {
          status: {
            not: OrderStatus.CANCELED,
          },
          createdAt: period,
        },
        select: {
          deliveryCost: true,
        },
      });

    // Calcular total de custo
    let totalCost = 0;
    orderProductsPeriod.forEach((op) => {
      totalCost += (op.product?.cost || 0) * op.quantity;
    });

    // Calcular total de frete
    let totalDeliveryCost = 0;
    ordersPeriodWithDeliveryCost.forEach((order) => {
      totalDeliveryCost += order.deliveryCost || 0;
    });

    const ordersForWorkedDays = await this.prismaService.order.findMany({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: period,
      },
      select: {
        createdAt: true,
      },
    });

    // Armazena os dias únicos de operação
    const workedDaysSet = new Set<string>();

    ordersForWorkedDays.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const hour = createdAt.getHours();

      // Se for antes das 12:00, considera como parte do "dia anterior"
      if (hour < 12) {
        createdAt.setDate(createdAt.getDate() - 1);
      }

      // Padroniza a data como 'YYYY-MM-DD'
      const dateKey = createdAt.toISOString().split('T')[0];

      workedDaysSet.add(dateKey);
    });

    const totalWorkedDays = workedDaysSet.size;

    const deliveryFixedCostPerDay = 50; // valor fixo por dia
    const deliveryFixedTotalCost = totalWorkedDays * deliveryFixedCostPerDay;

    const totalDeliveryCostMoreDeliveryFixedTotalCost =
      deliveryFixedTotalCost + totalDeliveryCost;

    // Calcular lucro
    const totalRevenue = revenuePeriod._sum.total || 0;
    const realProfit =
      totalRevenue - totalCost - totalDeliveryCostMoreDeliveryFixedTotalCost;

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
}
