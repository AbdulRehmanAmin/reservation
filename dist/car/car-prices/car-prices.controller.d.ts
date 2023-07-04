import { CarPricesService } from './car-prices.service';
import { CreateCarPriceDto } from './dto/create-car-price.dto';
import { UpdateCarPriceDto } from './dto/update-car-price.dto';
export declare class CarPricesController {
    private readonly carPricesService;
    constructor(carPricesService: CarPricesService);
    create(createCarPriceDto: CreateCarPriceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_prices;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: {
            id: number;
            car_id: number;
            car_price_type_id: number;
            monday: number;
            tuesday: number;
            wednesday: number;
            thursday: number;
            friday: number;
            saturday: number;
            sunday: number;
            car_name: string;
            car_price_type_name: string;
            created_at: Date;
            updated_at: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
        filteredHourlyArray: import(".prisma/client").car_prices[];
        filteredMilesArray: import(".prisma/client").car_prices[];
    }>;
    update(id: string, updateCarPriceDto: UpdateCarPriceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").car_prices;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
