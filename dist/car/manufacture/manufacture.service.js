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
exports.ManufactureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let ManufactureService = class ManufactureService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createManufactureDto) {
        var _a, _b;
        try {
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const newManufacture = await this.prismaService.manufacturers.create({
                data: Object.assign(Object.assign({}, createManufactureDto), { created_at, updated_at }),
            });
            return {
                status: newManufacture ? 'success' : 'failed',
                message: newManufacture
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newManufacture || {},
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
            const allManufactures = await this.prismaService.manufacturers.findMany();
            return {
                status: allManufactures.length > 0 ? 'success' : 'failed',
                message: allManufactures.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: allManufactures,
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
            const singleManufacture = await this.prismaService.manufacturers.findUnique({
                where: {
                    id,
                },
            });
            return {
                status: singleManufacture ? 'success' : 'failed',
                message: singleManufacture
                    ? 'Record found successfully!'
                    : 'No record found!',
                data: singleManufacture || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateManufactureDto) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updated = await this.prismaService.manufacturers.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, updateManufactureDto), { updated_at }),
            });
            return {
                status: updated ? 'success' : 'failed',
                message: updated
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updated || {},
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
            await this.prismaService.manufacturers.delete({
                where: {
                    id,
                },
            });
            return {
                status: 'success',
                message: 'Record deleted successfully!',
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ManufactureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManufactureService);
exports.ManufactureService = ManufactureService;
//# sourceMappingURL=manufacture.service.js.map