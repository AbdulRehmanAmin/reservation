import { Module } from '@nestjs/common';
import { AirportServicesService } from './airport_services.service';
import { AirportServicesController } from './airport_services.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [AirportServicesController],
  providers: [PrismaService,AirportServicesService]
})
export class AirportServicesModule {}
