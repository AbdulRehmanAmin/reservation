import { Module } from '@nestjs/common';
import { subServicesService } from './sub_services.service';
import { ToursServicesController } from './sub_services.controller';
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ToursServicesController],
  providers: [subServicesService,PrismaService]
})
export class ToursServicesModule {}
