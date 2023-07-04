import { PointToPointService } from './point-to-point.service';
import { CreatePointToPointDto } from './dto/create-point-to-point.dto';
import { UpdatePointToPointDto } from './dto/update-point-to-point.dto';
export declare class PointToPointController {
    private readonly pointToPointService;
    constructor(pointToPointService: PointToPointService);
    create(createPointToPointDto: CreatePointToPointDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updatePointToPointDto: UpdatePointToPointDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").point_to_point_services;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
