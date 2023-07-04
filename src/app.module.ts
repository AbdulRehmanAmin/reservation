import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { APP_PIPE } from '@nestjs/core';
import { TaxesModule } from './taxes/taxes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CarModule } from './car/car.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RouteServicesModule } from './route-services/route-services.module';
import { AirportServicesModule } from './airport_services/airport_services.module';
import { HourlyServicesModule } from './hourly_services/hourly_services.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { DriversModule } from './drivers/drivers.module';
import { LocationExceptionsModule } from './location-exceptions/location-exceptions.module';
import { CouponsModule } from './coupons/coupons.module';
import { PackageServiceModule } from './package_service/package_service.module';
import { ToursServicesModule } from './sub_services/sub_services.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AuthModule,
    UsersModule,
    TaxesModule,
    CarModule,
    ReservationsModule,
    RouteServicesModule,
    AirportServicesModule,
    HourlyServicesModule,
    VehicleTypesModule,
    DriversModule,
    LocationExceptionsModule,
    CouponsModule,
    PackageServiceModule,
    ToursServicesModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
