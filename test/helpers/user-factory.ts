import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userFactory = async (
  overrides: Partial<Prisma.UserCreateInput>,
): Promise<User> => {
  const user: Prisma.UserCreateInput = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email().toLowerCase(),
    password: 'Pass@123',
    role: 'user',
  };

  const data = { ...user, ...overrides };

  return await prisma.user.create({
    data,
  });
};
