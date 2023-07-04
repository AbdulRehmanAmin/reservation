import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons;
    }>;
}
