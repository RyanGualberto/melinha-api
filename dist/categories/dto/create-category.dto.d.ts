import { CategoryStatus } from '@prisma/client';
export declare class CreateCategoryDto {
    name: string;
    description: string;
    status: CategoryStatus;
}
