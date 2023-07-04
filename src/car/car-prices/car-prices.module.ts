import { Module } from '@nestjs/common';
import { CarPricesService } from './car-prices.service';
import { CarPricesController } from './car-prices.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [CarPricesController],
  providers: [CarPricesService, PrismaService],
})
export class CarPricesModule {}
