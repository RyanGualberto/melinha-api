import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, ProductVariant } from '@prisma/client';
import { productFactory } from './product-factory';

const prisma = new PrismaClient();

export const productVariantFactory = async (
  overrides: Partial<Prisma.ProductVariantCreateInput> = {},
): Promise<ProductVariant> => {
  const product = overrides.product || (await productFactory());

  const productVariantData: Prisma.ProductVariantCreateInput = {
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    status: 'active',
    image: faker.image.url(),
    product: {
      connect: {
        id: 'id' in product ? product.id : undefined,
      },
    },
  };

  return await prisma.productVariant.create({
    data: productVariantData,
  });
};
