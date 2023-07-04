import { CreateHourlyServiceDto } from './dto/create-hourly_service.dto';
import { UpdateHourlyServiceDto } from './dto/update-hourly_service.dto';
import { PrismaService } from '../prisma.service';
export declare class HourlyServicesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createHourlyService(body: CreateHourlyServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").hourly_services;
    }>;
    findAllHourlyService(): Promise<{
        status: string;
        message: string;
        count: number;
        data: import(".prisma/client").hourly_services[];
    }>;
    singleHourlyService(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    updateHourlyService(id: number, body: UpdateHourlyServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").hourly_services;
    }>;
    deleteHourlyService(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
