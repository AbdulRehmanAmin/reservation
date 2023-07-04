import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarPricesModule } from './car-prices/car-prices.module';
import { CarPriceTypesModule } from './car-price-types/car-price-types.module';
import { ManufactureModule } from './manufacture/manufacture.module';
import { BodyTypesModule } from './body-types/body-types.module';
import { TransmissionModule } from './transmission/transmission.module';
import { FuelTypesModule } from './fuel-types/fuel-types.module';
import { FeaturesModule } from './features/features.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CarController],
  providers: [PrismaService, CarService],

  imports: [
    CarPricesModule,
    ManufactureModule,
    BodyTypesModule,
    TransmissionModule,
    FuelTypesModule,
    FeaturesModule,
    CarPricesModule,
    CarPriceTypesModule,
  ],
})
export class CarModule {}
