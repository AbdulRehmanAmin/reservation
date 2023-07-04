"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyServicesModule = void 0;
const common_1 = require("@nestjs/common");
const hourly_services_service_1 = require("./hourly_services.service");
const hourly_services_controller_1 = require("./hourly_services.controller");
const prisma_service_1 = require("../prisma.service");
let HourlyServicesModule = class HourlyServicesModule {
};
HourlyServicesModule = __decorate([
    (0, common_1.Module)({
        controllers: [hourly_services_controller_1.HourlyServicesController],
        providers: [hourly_services_service_1.HourlyServicesService, prisma_service_1.PrismaService],
    })
], HourlyServicesModule);
exports.HourlyServicesModule = HourlyServicesModule;
//# sourceMappingURL=hourly_services.module.js.map