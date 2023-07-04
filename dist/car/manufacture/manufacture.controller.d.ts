import { ManufactureService } from './manufacture.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';
export declare class ManufactureController {
    private readonly manufactureService;
    constructor(manufactureService: ManufactureService);
    create(createManufactureDto: CreateManufactureDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateManufactureDto: UpdateManufactureDto): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
