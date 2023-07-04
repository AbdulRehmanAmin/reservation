import { CreateSubServiceDto } from './dto/create-sub_service.dto';
import { UpdateSubServiceDto } from './dto/update-sub_service.dto';
import { PrismaService } from '../prisma.service';
export declare class subServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createSubService(body: CreateSubServiceDto): Promise<{
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
    findOne(id: number, param: {
        limit: number;
        page: number;
        searchQuery: string;
    }): Promise<{
        status: string;
        totalRecords: number;
        message: string;
        data: any;
    }>;
    update(id: number, body: UpdateSubServiceDto): Promise<{
        status: string;
        message: string;
        data: {
            tour: any;
        };
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    getTimeslots(id: number): Promise<{
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
