import { PrismaService } from 'src/prisma.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';
export declare class BodyTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateBodyTypeDto: UpdateBodyTypeDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").body_types;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
