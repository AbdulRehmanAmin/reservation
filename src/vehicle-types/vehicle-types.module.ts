import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleTypesController } from './vehicle-types.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VehicleTypesController],
  providers: [PrismaService, VehicleTypesService],
})
export class VehicleTypesModule {}
