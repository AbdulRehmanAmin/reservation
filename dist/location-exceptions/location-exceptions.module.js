"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationExceptionsModule = void 0;
const common_1 = require("@nestjs/common");
const location_exceptions_service_1 = require("./location-exceptions.service");
const location_exceptions_controller_1 = require("./location-exceptions.controller");
const prisma_service_1 = require("../prisma.service");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
let LocationExceptionsModule = class LocationExceptionsModule {
};
LocationExceptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/csv',
                    filename: (req, file, callback) => {
                        const filename = `${file.originalname}`;
                        callback(null, filename);
                    },
                }),
            }),
        ],
        controllers: [location_exceptions_controller_1.LocationExceptionsController],
        providers: [prisma_service_1.PrismaService, location_exceptions_service_1.LocationExceptionsService],
    })
], LocationExceptionsModule);
exports.LocationExceptionsModule = LocationExceptionsModule;
//# sourceMappingURL=location-exceptions.module.js.map