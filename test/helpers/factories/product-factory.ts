import { faker } from '@faker-js/faker';
import { Product, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productFactory = async (
  overrides: Partial<Prisma.ProductCreateInput> = {},
): Promise<Product> => {
  const product: Prisma.ProductCreateInput = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 10, max: 500 }),
    category: { create: { name: faker.commerce.department() } }, // Criando uma categoria fictícia
    image: faker.image.url(),
    status: 'active',
  };

  const data = { ...product, ...overrides };

  return await prisma.product.create({
    data,
  });
};
