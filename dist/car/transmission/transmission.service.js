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
exports.TransmissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let TransmissionService = class TransmissionService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createTransmissionDto) {
        var _a, _b;
        try {
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const createTransmission = await this.prismaService.transmissions.create({
                data: Object.assign(Object.assign({}, createTransmissionDto), { created_at, updated_at }),
            });
            return {
                status: createTransmission ? 'success' : 'failed',
                message: createTransmission
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: createTransmission,
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
            const transmissions = await this.prismaService.transmissions.findMany();
            return {
                status: transmissions.length > 0 ? 'success' : 'failed',
                message: transmissions.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: transmissions,
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
            const transmission = await this.prismaService.transmissions.findUnique({
                where: { id },
            });
            return {
                status: transmission ? 'success' : 'failed',
                message: transmission
                    ? 'Record found successfully!'
                    : 'No record found!',
                data: transmission || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateTransmissionDto) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updateTransmission = await this.prismaService.transmissions.update({
                where: { id },
                data: Object.assign(Object.assign({}, updateTransmissionDto), { updated_at }),
            });
            return {
                status: updateTransmission ? 'success' : 'failed',
                message: updateTransmission
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateTransmission,
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
            await this.prismaService.transmissions.delete({
                where: { id },
            });
            return {
                status: 'success',
                message: 'Record deleted successfully!',
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
TransmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransmissionService);
exports.TransmissionService = TransmissionService;
//# sourceMappingURL=transmission.service.js.map