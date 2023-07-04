import { Module } from '@nestjs/common';
import { CarPriceTypesService } from './car-price-types.service';
import { CarPriceTypesController } from './car-price-types.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [CarPriceTypesController],
  providers: [CarPriceTypesService, PrismaService],
})
export class CarPriceTypesModule {}
