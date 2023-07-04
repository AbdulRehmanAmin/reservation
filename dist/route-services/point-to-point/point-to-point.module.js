"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointToPointModule = void 0;
const common_1 = require("@nestjs/common");
const point_to_point_service_1 = require("./point-to-point.service");
const point_to_point_controller_1 = require("./point-to-point.controller");
const prisma_service_1 = require("../../prisma.service");
let PointToPointModule = class PointToPointModule {
};
PointToPointModule = __decorate([
    (0, common_1.Module)({
        controllers: [point_to_point_controller_1.PointToPointController],
        providers: [prisma_service_1.PrismaService, point_to_point_service_1.PointToPointService],
    })
], PointToPointModule);
exports.PointToPointModule = PointToPointModule;
//# sourceMappingURL=point-to-point.module.js.map