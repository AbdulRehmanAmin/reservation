import { Module } from '@nestjs/common';
import { HourlyServicesService } from './hourly_services.service';
import { HourlyServicesController } from './hourly_services.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HourlyServicesController],
  providers: [HourlyServicesService, PrismaService],
})
export class HourlyServicesModule {}
