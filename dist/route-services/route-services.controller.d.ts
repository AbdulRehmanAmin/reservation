import { RouteServicesService } from './route-services.service';
import { CreateRouteServiceDto } from './dto/create-route-service.dto';
import { UpdateRouteServiceDto } from './dto/update-route-service.dto';
export declare class RouteServicesController {
    private readonly routeServicesService;
    constructor(routeServicesService: RouteServicesService);
    create(createRouteServiceDto: CreateRouteServiceDto): string;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").services[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateRouteServiceDto: UpdateRouteServiceDto): string;
    remove(id: string): string;
}
