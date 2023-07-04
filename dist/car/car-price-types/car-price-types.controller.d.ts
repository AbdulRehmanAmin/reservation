import { CarPriceTypesService } from './car-price-types.service';
import { CreateCarPriceTypeDto } from './dto/create-car-price-type.dto';
import { UpdateCarPriceTypeDto } from './dto/update-car-price-type.dto';
export declare class CarPriceTypesController {
    private readonly carPriceTypesService;
    constructor(carPriceTypesService: CarPriceTypesService);
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
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
    update(id: string, updateCarPriceTypeDto: UpdateCarPriceTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_price_types;
    }>;
}
