import { prisma } from './prisma.client';

export async function cleanDb() {
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productVariantCategory.deleteMany();
}
