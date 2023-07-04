"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModule = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const car_controller_1 = require("./car.controller");
const car_prices_module_1 = require("./car-prices/car-prices.module");
const car_price_types_module_1 = require("./car-price-types/car-price-types.module");
const manufacture_module_1 = require("./manufacture/manufacture.module");
const body_types_module_1 = require("./body-types/body-types.module");
const transmission_module_1 = require("./transmission/transmission.module");
const fuel_types_module_1 = require("./fuel-types/fuel-types.module");
const features_module_1 = require("./features/features.module");
const prisma_service_1 = require("../prisma.service");
let CarModule = class CarModule {
};
CarModule = __decorate([
    (0, common_1.Module)({
        controllers: [car_controller_1.CarController],
        providers: [prisma_service_1.PrismaService, car_service_1.CarService],
        imports: [
            car_prices_module_1.CarPricesModule,
            manufacture_module_1.ManufactureModule,
            body_types_module_1.BodyTypesModule,
            transmission_module_1.TransmissionModule,
            fuel_types_module_1.FuelTypesModule,
            features_module_1.FeaturesModule,
            car_prices_module_1.CarPricesModule,
            car_price_types_module_1.CarPriceTypesModule,
        ],
    })
], CarModule);
exports.CarModule = CarModule;
//# sourceMappingURL=car.module.js.map