import { subServicesService } from './sub_services.service';
import { CreateSubServiceDto } from './dto/create-sub_service.dto';
import { UpdateSubServiceDto } from './dto/update-sub_service.dto';
export declare class ToursServicesController {
    private readonly subServicesService;
    constructor(subServicesService: subServicesService);
    create(body: CreateSubServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").sub_services;
    }>;
    findAll(): Promise<{
        status: string;
        totalRecords: number;
        message: string;
        data: (import(".prisma/client").sub_services & {
            cars: {
                car_model: string;
            };
            services: {
                Name: string;
            };
            timeslots: import(".prisma/client").timeslots[];
        })[];
    }>;
    findOne(id: string, page: string, limit: string, searchQuery: string): Promise<{
        status: string;
        totalRecords: number;
        message: string;
        data: any;
    }>;
    update(id: string, updateSubServiceDto: UpdateSubServiceDto): Promise<{
        status: string;
        message: string;
        data: {
            tour: any;
        };
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    getTimeSlots(id: string): Promise<{
        status: string;
        message: string;
        data: {
            timeSlots: import(".prisma/client").timeslots[];
            pickup_location: string;
            pick_up_lat: number;
            pick_up_lon: number;
        };
    }>;
}
