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
exports.TaxesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TaxesService = class TaxesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async readTaxes(query) {
        var _a, _b;
        try {
            const page = query.page * 1 || 1;
            const limit = query.limit * 1 || 10;
            const toSkip = (page - 1) * limit;
            const getAllTaxes = await this.prismaService.gratuities.findMany({
                skip: toSkip,
                take: limit,
                include: {
                    services: {
                        select: {
                            Name: true
                        }
                    }
                }
            });
            const allTaxes = getAllTaxes === null || getAllTaxes === void 0 ? void 0 : getAllTaxes.map((tax) => {
                var _a;
                return {
                    name: tax.name,
                    id: tax.id,
                    status: tax.status,
                    price: tax.price,
                    percentage: tax.percentage,
                    services: (_a = tax.services) === null || _a === void 0 ? void 0 : _a.Name
                };
            });
            return {
                status: allTaxes.length > 0 ? 'success' : 'failed',
                message: allTaxes.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: allTaxes,
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
    async createTax(body) {
        var _a, _b;
        try {
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const status = body.status ? true : false;
            const newTax = await this.prismaService.gratuities.create({
                data: Object.assign(Object.assign({}, body), { status, created_at, updated_at }),
            });
            return {
                status: newTax ? 'success' : 'failed',
                message: newTax ? 'Record created successfully!' : 'No record created!',
                data: newTax,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTax(id) {
        var _a, _b;
        try {
            await this.prismaService.gratuities.delete({
                where: {
                    id: Number(id),
                },
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
    async updateTax(id, body) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updateTax = await this.prismaService.gratuities.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, body), { updated_at }),
            });
            return {
                status: updateTax ? 'success' : 'failed',
                message: updateTax
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateTax,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTaxesByServiceId(id) {
        var _a, _b;
        try {
            const allTaxes = await this.prismaService.gratuities.findMany({
                where: {
                    service_id: Number(id),
                },
            });
            return {
                status: allTaxes.length > 0 ? 'success' : 'failed',
                message: allTaxes.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: allTaxes,
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
TaxesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaxesService);
exports.TaxesService = TaxesService;
//# sourceMappingURL=taxes.service.js.map