import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
    create(createDriverDto: CreateDriverDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers;
    }>;
}
