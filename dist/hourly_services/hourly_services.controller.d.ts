import { HourlyServicesService } from './hourly_services.service';
import { CreateHourlyServiceDto } from './dto/create-hourly_service.dto';
import { UpdateHourlyServiceDto } from './dto/update-hourly_service.dto';
export declare class HourlyServicesController {
    private readonly hourlyServicesService;
    constructor(hourlyServicesService: HourlyServicesService);
    createHourlyService(body: CreateHourlyServiceDto): Promise<any>;
    findAll(): Promise<{
        status: string;
        message: string;
        count: number;
        data: import(".prisma/client").hourly_services[];
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateHourlyServiceDto: UpdateHourlyServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").hourly_services;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
