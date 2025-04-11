import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma-service';
import { Address, OrderStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    const totalClients = await this.prismaService.user.count({
      where: { role: 'user' },
    });
    const now = new Date();

    // Últimos 30 dias
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    // Encontrar a última sexta-feira
    const lastFriday = new Date();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const daysSinceFriday = ((currentDay + 1) % 7) + 1; // Distância do último sábado para sexta
    lastFriday.setDate(now.getDate() - daysSinceFriday);
    lastFriday.setHours(0, 0, 0, 0); // Sexta-feira às 00h00

    // Definir o fim do final de semana (segunda-feira às 02h00)
    const mondayAt2AM = new Date(lastFriday);
    mondayAt2AM.setDate(lastFriday.getDate() + 3); // Pular para segunda-feira
    mondayAt2AM.setHours(2, 0, 0, 0); // Segunda-feira às 02h00

    // Quantidade de pedidos nos períodos
    const ordersLast30Days = await this.prismaService.order.count({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: { gte: last30Days },
      },
    });

    const ordersLastWeekend = await this.prismaService.order.count({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: { gte: lastFriday, lte: mondayAt2AM },
      },
    });

    // Valor faturado nos períodos
    const revenueLast30Days = await this.prismaService.order.aggregate({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: { gte: last30Days },
      },
      _sum: { total: true },
    });

    const revenueLastWeekend = await this.prismaService.order.aggregate({
      where: {
        status: {
          not: OrderStatus.CANCELED,
        },
        createdAt: { gte: lastFriday, lte: mondayAt2AM },
      },
      _sum: { total: true },
    });

    // Item mais e menos vendido nos últimos 30 dias
    const bestWorstSellingItemLast30Days =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: { gte: last30Days },
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 1, // Mais vendido
      });

    const leastSellingItemLast30Days =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: { gte: last30Days },
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'asc' } },
        take: 1, // Menos vendido
      });

    // Item mais e menos vendido no último final de semana
    const bestWorstSellingItemLastWeekend =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: { gte: lastFriday, lte: mondayAt2AM },
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 1, // Mais vendido
      });

    const leastSellingItemLastWeekend =
      await this.prismaService.orderProduct.groupBy({
        by: ['productTitleSnapshot'],
        where: {
          order: {
            status: {
              not: OrderStatus.CANCELED,
            },
            createdAt: { gte: lastFriday, lte: mondayAt2AM },
          },
        },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'asc' } },
        take: 1, // Menos vendido
      });

    const addressWithOrdersLast30Days = await this.prismaService.order.findMany(
      {
        where: {
          status: {
            not: OrderStatus.CANCELED,
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
      },
    );

    const districtCountLast30Days: Record<string, number> = {};

    addressWithOrdersLast30Days.forEach((order) => {
      try {
        const address = JSON.parse(order.addressSnapshot as string) as Address;
        const district = address.district;

        if (district) {
          districtCountLast30Days[district] =
            (districtCountLast30Days[district] || 0) + 1;
        }
      } catch (error) {
        console.error('Erro ao parsear addressSnapshot:', error);
      }
    });

    const sortedDistrictsLast30Days = Object.entries(
      districtCountLast30Days,
    ).sort((a, b) => b[1] - a[1]);
    const bestWorstSellingNeighborhoodLast30Days =
      sortedDistrictsLast30Days[0] || ['Nenhum', 0];
    const leastSellingNeighborhoodLast30Days = sortedDistrictsLast30Days[
      sortedDistrictsLast30Days.length - 1
    ] || ['Nenhum', 0];

    const addressWithOrdersLastWeekend =
      await this.prismaService.order.findMany({
        where: {
          status: {
            not: OrderStatus.CANCELED,
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

    const districtCountLastWeekend: Record<string, number> = {};

    addressWithOrdersLastWeekend.forEach((order) => {
      try {
        const address = JSON.parse(order.addressSnapshot as string) as Address;
        const district = address.district;

        if (district) {
          districtCountLastWeekend[district] =
            (districtCountLastWeekend[district] || 0) + 1;
        }
      } catch (error) {
        console.error('Erro ao parsear addressSnapshot:', error);
      }
    });

    const sortedDistrictsLastWeekend = Object.entries(
      districtCountLastWeekend,
    ).sort((a, b) => b[1] - a[1]);

    const bestWorstSellingNeighborhoodLastWeekend =
      sortedDistrictsLastWeekend[0] || ['Nenhum', 0];
    const leastSellingNeighborhoodLastWeekend = sortedDistrictsLastWeekend[
      sortedDistrictsLastWeekend.length - 1
    ] || ['Nenhum', 0];

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
      bestWorstSellingNeighborhoodLastWeekend:
        bestWorstSellingNeighborhoodLastWeekend,
      leastSellingNeighborhoodLastWeekend: leastSellingNeighborhoodLastWeekend,
    };
  }
}
