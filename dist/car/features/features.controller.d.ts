import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
export declare class FeaturesController {
    private readonly featuresService;
    constructor(featuresService: FeaturesService);
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
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateFeatureDto: UpdateFeatureDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").features;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
