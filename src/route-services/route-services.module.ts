import { Module } from '@nestjs/common';
import { RouteServicesService } from './route-services.service';
import { RouteServicesController } from './route-services.controller';
import { PrismaService } from 'src/prisma.service';
import { PointToPointModule } from './point-to-point/point-to-point.module';

@Module({
  controllers: [RouteServicesController],
  providers: [PrismaService, RouteServicesService],
  imports: [PointToPointModule],
})
export class RouteServicesModule {}
