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
exports.PointToPointService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let PointToPointService = class PointToPointService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(body) {
        var _a, _b;
        try {
            const newPtpSrvc = await this.prismaService.point_to_point_services.create({
                data: {
                    service_id: body.service_id,
                    name: body.name,
                    description: body === null || body === void 0 ? void 0 : body.description,
                    pickup_location: body.pickup_location,
                    pickup_date_time: body.pickup_date_time,
                    num_passengers: body.num_passengers,
                    dropoff_location: body.dropoff_location,
                    add_another_stop: body.add_another_stop ? true : false,
                    additional_comments: body.additional_comments,
                    status: body.status ? true : false,
                    pick_up_lat: body.pick_up_lat,
                    pick_up_lon: body.pick_up_lon,
                    drop_off_lat: body.drop_off_lat,
                    drop_off_lon: body.drop_off_lon,
                },
            });
            return {
                status: newPtpSrvc ? 'success' : 'failed',
                message: newPtpSrvc
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newPtpSrvc,
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
            const ptpSrvc = await this.prismaService.point_to_point_services.findMany();
            return {
                status: ptpSrvc.length > 0 ? 'success' : 'failed',
                message: ptpSrvc.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: ptpSrvc,
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
            const singlePtpSrvc = await this.prismaService.point_to_point_services.findUnique({
                where: { id },
            });
            return {
                status: singlePtpSrvc ? 'success' : 'failed',
                message: singlePtpSrvc
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: singlePtpSrvc || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        var _a, _b;
        try {
            const singleSrvc = await this.prismaService.point_to_point_services.findUnique({
                where: {
                    id,
                },
            });
            const updateSrvc = await this.prismaService.point_to_point_services.update({
                where: { id },
                data: {
                    service_id: body.service_id || singleSrvc.service_id,
                    name: body.name || singleSrvc.name,
                    description: (body === null || body === void 0 ? void 0 : body.description) || singleSrvc.description,
                    pickup_location: body.pickup_location || singleSrvc.pickup_location,
                    pickup_date_time: body.pickup_date_time || singleSrvc.pickup_date_time,
                    num_passengers: body.num_passengers || singleSrvc.num_passengers,
                    dropoff_location: body.dropoff_location || singleSrvc.dropoff_location,
                    add_another_stop: body.add_another_stop
                        ? true
                        : false || singleSrvc.add_another_stop,
                    additional_comments: body.additional_comments || singleSrvc.additional_comments,
                    status: body.status ? true : false || singleSrvc.status,
                    pick_up_lat: body.pick_up_lat || singleSrvc.pick_up_lat,
                    pick_up_lon: body.pick_up_lon || singleSrvc.pick_up_lon,
                    drop_off_lat: body.drop_off_lat || singleSrvc.drop_off_lat,
                    drop_off_lon: body.drop_off_lon || singleSrvc.drop_off_lon,
                },
            });
            return {
                status: updateSrvc ? 'success' : 'failed',
                message: updateSrvc
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateSrvc,
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
            await this.prismaService.point_to_point_services.delete({
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
};
PointToPointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PointToPointService);
exports.PointToPointService = PointToPointService;
//# sourceMappingURL=point-to-point.service.js.map