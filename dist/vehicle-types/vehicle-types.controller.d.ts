import { VehicleTypesService } from './vehicle-types.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
export declare class VehicleTypesController {
    private readonly vehicleTypesService;
    constructor(vehicleTypesService: VehicleTypesService);
    create(createVehicleTypeDto: CreateVehicleTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types;
    }>;
}
