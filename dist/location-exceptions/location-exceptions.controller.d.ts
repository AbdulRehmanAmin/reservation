/// <reference types="multer" />
import { LocationExceptionsService } from './location-exceptions.service';
import { CreateLocationExceptionDto } from './dto/create-location-exception.dto';
import { UpdateLocationExceptionDto } from './dto/update-location-exception.dto';
export declare class LocationExceptionsController {
    private readonly locationExceptionsService;
    constructor(locationExceptionsService: LocationExceptionsService);
    create(createLocationExceptionDto: CreateLocationExceptionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
    uploadCsv(file: Express.Multer.File): Promise<{
        status: string;
        message?: undefined;
        data?: undefined;
    } | {
        status: string;
        message: any;
        data: any;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateLocationExceptionDto: UpdateLocationExceptionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").location_exceptions;
    }>;
}
