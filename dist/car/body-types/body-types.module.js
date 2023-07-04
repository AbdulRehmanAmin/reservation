"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyTypesModule = void 0;
const common_1 = require("@nestjs/common");
const body_types_service_1 = require("./body-types.service");
const body_types_controller_1 = require("./body-types.controller");
const prisma_service_1 = require("../../prisma.service");
let BodyTypesModule = class BodyTypesModule {
};
BodyTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [body_types_controller_1.BodyTypesController],
        providers: [prisma_service_1.PrismaService, body_types_service_1.BodyTypesService],
    })
], BodyTypesModule);
exports.BodyTypesModule = BodyTypesModule;
//# sourceMappingURL=body-types.module.js.map