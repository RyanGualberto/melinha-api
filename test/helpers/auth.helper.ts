import { prisma } from './prisma.client';
import { userFactory } from './user-factory';
import jwt from 'jsonwebtoken';

export async function getUserToken(userId?: string): Promise<string> {
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return jwt.sign({ sub: userId, user }, String(process.env.JWT_SECRET), {
      expiresIn: '1d',
    });
  }
  const user = await userFactory({});
  return jwt.sign({ sub: user.id, user }, String(process.env.JWT_SECRET));
}
