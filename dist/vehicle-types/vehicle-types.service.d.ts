import { PrismaService } from 'src/prisma.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
export declare class VehicleTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").vehicle_types;
    }>;
}
