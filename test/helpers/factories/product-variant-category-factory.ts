import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, ProductVariantCategory } from '@prisma/client';

const prisma = new PrismaClient();

export const productVariantCategoryFactory = async (
  overrides: Partial<Prisma.ProductVariantCategoryCreateInput> = {},
): Promise<ProductVariantCategory> => {
  const productVariantData: Prisma.ProductVariantCategoryCreateInput = {
    name: faker.commerce.productName(),
  };

  const data = {
    ...productVariantData,
    ...overrides,
  };

  return await prisma.productVariantCategory.create({
    data,
  });
};
