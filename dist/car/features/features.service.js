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
exports.FeaturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let FeaturesService = class FeaturesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createFeatureDto) {
        var _a, _b;
        try {
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const createFeature = await this.prismaService.features.create({
                data: Object.assign(Object.assign({}, createFeatureDto), { created_at, updated_at }),
            });
            return {
                status: createFeature ? 'success' : 'failed',
                message: createFeature
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: createFeature,
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
            const allFeatures = await this.prismaService.features.findMany();
            return {
                status: allFeatures.length > 0 ? 'success' : 'failed',
                message: allFeatures.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: allFeatures,
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
            const singleFeature = await this.prismaService.features.findUnique({
                where: { id },
            });
            return {
                status: singleFeature ? 'success' : 'failed',
                message: singleFeature
                    ? 'Record found successfully!'
                    : 'No record found!',
                data: singleFeature || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateFeatureDto) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updateFeature = await this.prismaService.features.update({
                where: { id },
                data: Object.assign(Object.assign({}, updateFeatureDto), { updated_at }),
            });
            return {
                status: updateFeature ? 'success' : 'failed',
                message: updateFeature
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateFeature,
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
            await this.prismaService.features.delete({
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
FeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeaturesService);
exports.FeaturesService = FeaturesService;
//# sourceMappingURL=features.service.js.map