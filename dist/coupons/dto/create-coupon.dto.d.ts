import { CouponType } from '@prisma/client';
export declare class CreateCouponDto {
    code: string;
    description?: string;
    discount: number;
    type: CouponType;
    maxUses?: number;
    usedCount: number;
    expiresAt?: Date;
    active?: boolean;
}
