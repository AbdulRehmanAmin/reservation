import { PrismaService } from "src/prisma.service";
import { CreateLocationExceptionDto } from "./dto/create-location-exception.dto";
import { UpdateLocationExceptionDto } from "./dto/update-location-exception.dto";
export declare class LocationExceptionsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createLocationExceptionDto: CreateLocationExceptionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
    processCsv(filePath: string): Promise<unknown>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateLocationExceptionDto: UpdateLocationExceptionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
}
