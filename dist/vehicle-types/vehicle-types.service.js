"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let VehicleTypesService = class VehicleTypesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createVehicleTypeDto) {
        var _a, _b;
        try {
            const newVehicle = await this.prismaService.vehicle_types.create({
                data: createVehicleTypeDto,
            });
            return {
                status: newVehicle ? 'success' : 'failed',
                message: newVehicle
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newVehicle,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const allVehicleTypes = await this.prismaService.vehicle_types.findMany();
            return {
                status: allVehicleTypes.length > 0 ? 'success' : 'failed',
                message: allVehicleTypes.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: allVehicleTypes,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        var _a, _b;
        try {
            const vehicle = await this.prismaService.vehicle_types.findUnique({
                where: { id },
            });
            return {
                status: vehicle ? 'success' : 'failed',
                message: vehicle ? 'Records found successfully!' : 'No records found!',
                data: vehicle || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateVehicleTypeDto) {
        var _a, _b;
        try {
            const updatedVehicleType = await this.prismaService.vehicle_types.update({
                where: { id },
                data: updateVehicleTypeDto,
            });
            return {
                status: updatedVehicleType ? 'success' : 'failed',
                message: updatedVehicleType
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updatedVehicleType,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        var _a, _b;
        try {
            const deletedVehicleType = await this.prismaService.vehicle_types.delete({
                where: { id },
            });
            return {
                status: 'success',
                message: 'Record deleted successfully!',
                data: deletedVehicleType,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
VehicleTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleTypesService);
exports.VehicleTypesService = VehicleTypesService;
//# sourceMappingURL=vehicle-types.service.js.map