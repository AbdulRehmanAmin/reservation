"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma.service");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const configuration_1 = require("./config/configuration");
const core_1 = require("@nestjs/core");
const taxes_module_1 = require("./taxes/taxes.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const car_module_1 = require("./car/car.module");
const reservations_module_1 = require("./reservations/reservations.module");
const route_services_module_1 = require("./route-services/route-services.module");
const airport_services_module_1 = require("./airport_services/airport_services.module");
const hourly_services_module_1 = require("./hourly_services/hourly_services.module");
const vehicle_types_module_1 = require("./vehicle-types/vehicle-types.module");
const drivers_module_1 = require("./drivers/drivers.module");
const location_exceptions_module_1 = require("./location-exceptions/location-exceptions.module");
const coupons_module_1 = require("./coupons/coupons.module");
const package_service_module_1 = require("./package_service/package_service.module");
const sub_services_module_1 = require("./sub_services/sub_services.module");
const payments_module_1 = require("./payments/payments.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            taxes_module_1.TaxesModule,
            car_module_1.CarModule,
            reservations_module_1.ReservationsModule,
            route_services_module_1.RouteServicesModule,
            airport_services_module_1.AirportServicesModule,
            hourly_services_module_1.HourlyServicesModule,
            vehicle_types_module_1.VehicleTypesModule,
            drivers_module_1.DriversModule,
            location_exceptions_module_1.LocationExceptionsModule,
            coupons_module_1.CouponsModule,
            package_service_module_1.PackageServiceModule,
            sub_services_module_1.ToursServicesModule,
            payments_module_1.PaymentsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map