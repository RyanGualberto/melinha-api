import { CategoryStatus } from '@prisma/client';

export class CreateCategoryDto {
  name: string;
  description: string;
  status: CategoryStatus;
}
