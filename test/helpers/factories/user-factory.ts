import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

export const userFactory = async (
  overrides: Partial<Prisma.UserCreateInput>,
): Promise<User> => {
  const user: Prisma.UserCreateInput = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email().toLowerCase(),
    password: await encryptPassword('Pass@123'),
    role: 'user',
  };

  const data = { ...user, ...overrides };

  if (overrides.password) {
    data.password = await encryptPassword(overrides.password);
  }

  return await prisma.user.create({
    data,
  });
};

const encryptPassword = async (password: string) => {
  const salt = crypto.randomInt(0, 10);
  const hashed_password = await bcrypt.hash(password, salt);

  return hashed_password;
};
