import { PrismaService } from 'src/prisma.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';
export declare class ManufactureService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createManufactureDto: CreateManufactureDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateManufactureDto: UpdateManufactureDto): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
