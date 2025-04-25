import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number;
        type: import(".prisma/client").$Enums.CouponType;
        description: string | null;
        code: string;
        maxUses: number | null;
        usedCount: number;
        expiresAt: Date | null;
        active: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number;
        type: import(".prisma/client").$Enums.CouponType;
        description: string | null;
        code: string;
        maxUses: number | null;
        usedCount: number;
        expiresAt: Date | null;
        active: boolean;
    }[]>;
    findOne(code: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number;
        type: import(".prisma/client").$Enums.CouponType;
        description: string | null;
        code: string;
        maxUses: number | null;
        usedCount: number;
        expiresAt: Date | null;
        active: boolean;
    }>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number;
        type: import(".prisma/client").$Enums.CouponType;
        description: string | null;
        code: string;
        maxUses: number | null;
        usedCount: number;
        expiresAt: Date | null;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discount: number;
        type: import(".prisma/client").$Enums.CouponType;
        description: string | null;
        code: string;
        maxUses: number | null;
        usedCount: number;
        expiresAt: Date | null;
        active: boolean;
    }>;
}
