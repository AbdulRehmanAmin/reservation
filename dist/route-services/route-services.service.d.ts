import { PrismaService } from 'src/prisma.service';
import { CreateRouteServiceDto } from './dto/create-route-service.dto';
import { UpdateRouteServiceDto } from './dto/update-route-service.dto';
export declare class RouteServicesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createRouteServiceDto: CreateRouteServiceDto): string;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").services[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateRouteServiceDto: UpdateRouteServiceDto): string;
    remove(id: number): string;
}
