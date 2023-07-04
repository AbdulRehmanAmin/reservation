import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    getHello(): any;
}
