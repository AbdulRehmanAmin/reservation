import { CreateCarPriceTypeDto } from './dto/create-car-price-type.dto';
import { UpdateCarPriceTypeDto } from './dto/update-car-price-type.dto';
import { PrismaService } from '../../prisma.service';
export declare class CarPriceTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCarPriceTypeDto: CreateCarPriceTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
    update(id: number, updateCarPriceTypeDto: UpdateCarPriceTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
}
