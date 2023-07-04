import { PrismaService } from 'src/prisma.service';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';
export declare class TransmissionService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: number, updateTransmissionDto: UpdateTransmissionDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").transmissions;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
