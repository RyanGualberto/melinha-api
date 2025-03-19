import { faker } from '@faker-js/faker';
import { Category, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryFactory = async (
  overrides: Partial<Prisma.CategoryCreateInput>,
): Promise<Category> => {
  const category: Prisma.CategoryCreateInput = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  };

  const data = { ...category, ...overrides };

  return await prisma.category.create({
    data,
  });
};
