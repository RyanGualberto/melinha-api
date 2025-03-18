import { userFactory } from './user-factory';
import jwt from 'jsonwebtoken';

export async function getUserToken(userId?: string): Promise<string> {
  if (userId) {
    return jwt.sign({ id: userId }, String(process.env.JWT_SECRET));
  }
  const id = await userFactory({}).then((user) => user.id);
  return jwt.sign({ id }, String(process.env.JWT_SECRET));
}
