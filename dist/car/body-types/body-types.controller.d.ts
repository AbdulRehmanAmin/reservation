import { BodyTypesService } from './body-types.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';
export declare class BodyTypesController {
    private readonly bodyTypesService;
    constructor(bodyTypesService: BodyTypesService);
    create(createBodyTypeDto: CreateBodyTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").body_types;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").body_types[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateBodyTypeDto: UpdateBodyTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").body_types;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
