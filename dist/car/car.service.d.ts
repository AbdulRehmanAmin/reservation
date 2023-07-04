import { PrismaService } from 'src/prisma.service';
import { CreateCarDto, carType } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateSlabDto } from './dto/create-slab.dto';
import { UpdateSlabDto } from './dto/update-slab.dto ';
export declare class CarService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCarDto: CreateCarDto): Promise<{
        status: string;
        message: string;
        data: {
            newCar: import(".prisma/client").cars;
        };
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: {
            id: number;
            body_type_id: number;
            transmission_id: number;
            manufacturer_id: number;
            driver_id: number;
            car_model: string;
            name: string;
            passenger_seats: number;
            maximum_luggage: number;
            total_doors: number;
            child_seat: number;
            image: string;
            qty: string;
            status: boolean;
            per_mile_rate: number;
            hourly_rate: number;
            minimum_fare: number;
            maximum_hours: number;
            fixed_price: number;
            is_slab_enabled: boolean;
            body_type: string;
            transmission: string;
            manufacturer: string;
            fuel_type: string;
            driver: string;
            vehicle_type: string;
            created_at: Date;
            updated_at: Date;
            car_type: import(".prisma/client").cars_car_type;
        }[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateCarDto: UpdateCarDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").cars;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    addSlab(car_id: number, dto: CreateSlabDto): Promise<{
        status: string;
        message: string;
        data: {};
    } | {
        status: string;
        message: string;
        data: import(".prisma/client").slabs;
    }>;
    updateSlab(id: number, dto: UpdateSlabDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").slabs;
    }>;
    deleteSlab(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").slabs;
    }>;
    getCarByType(type: carType): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").cars[];
    }>;
}
