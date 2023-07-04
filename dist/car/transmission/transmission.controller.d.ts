import { TransmissionService } from './transmission.service';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';
export declare class TransmissionController {
    private readonly transmissionService;
    constructor(transmissionService: TransmissionService);
    create(createTransmissionDto: CreateTransmissionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").transmissions;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").transmissions[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateTransmissionDto: UpdateTransmissionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").transmissions;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
