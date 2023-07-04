"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteServicesModule = void 0;
const common_1 = require("@nestjs/common");
const route_services_service_1 = require("./route-services.service");
const route_services_controller_1 = require("./route-services.controller");
const prisma_service_1 = require("../prisma.service");
const point_to_point_module_1 = require("./point-to-point/point-to-point.module");
let RouteServicesModule = class RouteServicesModule {
};
RouteServicesModule = __decorate([
    (0, common_1.Module)({
        controllers: [route_services_controller_1.RouteServicesController],
        providers: [prisma_service_1.PrismaService, route_services_service_1.RouteServicesService],
        imports: [point_to_point_module_1.PointToPointModule],
    })
], RouteServicesModule);
exports.RouteServicesModule = RouteServicesModule;
//# sourceMappingURL=route-services.module.js.map