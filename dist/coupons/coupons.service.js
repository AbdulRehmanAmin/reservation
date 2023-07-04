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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CouponsService = class CouponsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCouponDto) {
        var _a, _b;
        try {
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const coupon = await this.prismaService.coupons.create({
                data: Object.assign(Object.assign({}, createCouponDto), { created_at, updated_at })
            });
            return {
                status: coupon ? "success" : "failed",
                message: Object.assign(Object.assign({}, coupon), { created_at, updated_at }) ? "Record created successfully!"
                    : "No record created!",
                data: coupon
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const coupons = await this.prismaService.coupons.findMany();
            return {
                status: coupons.length > 0 ? "success" : "failed",
                message: coupons.length > 0
                    ? "Records found successfully!"
                    : "No records found!",
                data: coupons
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        var _a, _b;
        try {
            const coupon = await this.prismaService.coupons.findUnique({
                where: { id }
            });
            return {
                status: coupon ? "success" : "failed",
                message: coupon ? "Records found successfully!" : "No records found!",
                data: coupon || {}
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCouponDto) {
        var _a, _b;
        try {
            const updatedCoupon = await this.prismaService.coupons.update({
                where: { id },
                data: updateCouponDto
            });
            return {
                status: updatedCoupon ? "success" : "failed",
                message: updatedCoupon
                    ? "Record updated successfully!"
                    : "No record updated!",
                data: updatedCoupon
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        var _a, _b;
        try {
            const coupon = await this.prismaService.coupons.delete({
                where: { id }
            });
            return {
                status: "success",
                message: "Record deleted successfully!",
                data: coupon
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponsService);
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map