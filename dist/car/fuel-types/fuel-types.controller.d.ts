import { FuelTypesService } from './fuel-types.service';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';
export declare class FuelTypesController {
    private readonly fuelTypesService;
    constructor(fuelTypesService: FuelTypesService);
    create(createFuelTypeDto: CreateFuelTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").fuel_types;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").fuel_types[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateFuelTypeDto: UpdateFuelTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").fuel_types;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
