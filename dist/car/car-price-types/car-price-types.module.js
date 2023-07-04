"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPriceTypesModule = void 0;
const common_1 = require("@nestjs/common");
const car_price_types_service_1 = require("./car-price-types.service");
const car_price_types_controller_1 = require("./car-price-types.controller");
const prisma_service_1 = require("../../prisma.service");
let CarPriceTypesModule = class CarPriceTypesModule {
};
CarPriceTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [car_price_types_controller_1.CarPriceTypesController],
        providers: [car_price_types_service_1.CarPriceTypesService, prisma_service_1.PrismaService],
    })
], CarPriceTypesModule);
exports.CarPriceTypesModule = CarPriceTypesModule;
//# sourceMappingURL=car-price-types.module.js.map