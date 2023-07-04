import { PrismaService } from 'src/prisma.service';
import { CreatePointToPointDto } from './dto/create-point-to-point.dto';
import { UpdatePointToPointDto } from './dto/update-point-to-point.dto';
export declare class PointToPointService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(body: CreatePointToPointDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, body: UpdatePointToPointDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
