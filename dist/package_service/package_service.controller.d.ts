import { PackageServiceService } from "./package_service.service";
import { CreatePackageServiceDto } from "./dto/create-package_service.dto";
import { UpdatePackageServiceDto } from "./dto/update-package_service.dto";
export declare class PackageServiceController {
    private readonly packageServiceService;
    constructor(packageServiceService: PackageServiceService);
    create(body: CreatePackageServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").package_serivce;
    }>;
    findAll(page: string, limit: string, searchQuery: string): Promise<{
        status: string;
        message: string;
        data: any;
        totalRecords: number;
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").package_serivce & {
            cars: {
                id: number;
                name: string;
                passenger_seats: number;
                image: string;
            };
        };
    }>;
    update(id: string, body: UpdatePackageServiceDto): Promise<{
        status: string;
        message: string;
        data: any[] | import(".prisma/client").package_serivce;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: any[];
    }>;
}
