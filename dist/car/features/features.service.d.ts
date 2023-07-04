import { PrismaService } from 'src/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
export declare class FeaturesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createFeatureDto: CreateFeatureDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").features;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").features[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateFeatureDto: UpdateFeatureDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").features;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
