import { PrismaService } from 'src/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateDriverDto: UpdateDriverDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").drivers;
    }>;
}
