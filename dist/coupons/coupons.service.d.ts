import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import { PrismaService } from "../prisma.service";
export declare class CouponsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateCouponDto: UpdateCouponDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").coupons;
    }>;
}
