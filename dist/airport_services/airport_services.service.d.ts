import { AirportDTO } from './dto/create-airport_service.dto';
import { UpdateAirportServiceDto } from './dto/update-airport_service.dto';
import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
export declare class AirportServicesService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    create(body: AirportDTO): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, body: UpdateAirportServiceDto): Promise<any>;
    remove(id: number): Promise<any>;
}
