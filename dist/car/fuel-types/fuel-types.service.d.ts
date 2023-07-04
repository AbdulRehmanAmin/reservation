import { PrismaService } from 'src/prisma.service';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';
export declare class FuelTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateFuelTypeDto: UpdateFuelTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").fuel_types;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
