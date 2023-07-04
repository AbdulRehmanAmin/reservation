"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelTypesModule = void 0;
const common_1 = require("@nestjs/common");
const fuel_types_service_1 = require("./fuel-types.service");
const fuel_types_controller_1 = require("./fuel-types.controller");
const prisma_service_1 = require("../../prisma.service");
let FuelTypesModule = class FuelTypesModule {
};
FuelTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [fuel_types_controller_1.FuelTypesController],
        providers: [prisma_service_1.PrismaService, fuel_types_service_1.FuelTypesService],
    })
], FuelTypesModule);
exports.FuelTypesModule = FuelTypesModule;
//# sourceMappingURL=fuel-types.module.js.map