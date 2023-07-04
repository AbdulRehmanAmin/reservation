import { CreatePackageServiceDto } from "./dto/create-package_service.dto";
import { UpdatePackageServiceDto } from "./dto/update-package_service.dto";
import { PrismaService } from "../prisma.service";
export declare class PackageServiceService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(body: CreatePackageServiceDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").package_serivce;
    }>;
    findAll(param: {
        limit: number;
        page: number;
        searchQuery: string;
    }): Promise<{
        status: string;
        message: string;
        data: any;
        totalRecords: number;
    }>;
    findOne(id: number): Promise<{
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
    update(id: number, updatePackageServiceDto: UpdatePackageServiceDto): Promise<{
        status: string;
        message: string;
        data: any[] | import(".prisma/client").package_serivce;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: any[];
    }>;
}
