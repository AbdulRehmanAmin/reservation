import { Module } from '@nestjs/common';
import { FuelTypesService } from './fuel-types.service';
import { FuelTypesController } from './fuel-types.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FuelTypesController],
  providers: [PrismaService, FuelTypesService],
})
export class FuelTypesModule {}
