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
exports.HourlyServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let HourlyServicesService = class HourlyServicesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createHourlyService(body) {
        var _a, _b;
        try {
            const newHourlyService = await this.prismaService.hourly_services.create({
                data: {
                    name: body.name,
                    description: body === null || body === void 0 ? void 0 : body.description,
                    pickup_location: body.pickup_location,
                    pickup_date_time: body.pickup_date_time,
                    num_passengers: body.num_passengers,
                    num_service_hours: body.num_service_hours,
                    dropoff_location: body.dropoff_location,
                    add_another_stop: body.add_another_stop,
                    additional_comments: body === null || body === void 0 ? void 0 : body.additional_comments,
                    status: body.status || true,
                    service_id: body.service_id,
                },
            });
            return {
                status: newHourlyService ? 'success' : 'failed',
                message: newHourlyService
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newHourlyService,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllHourlyService() {
        var _a, _b;
        try {
            const hourlyServices = await this.prismaService.hourly_services.findMany({});
            return {
                status: hourlyServices.length > 0 ? 'success' : 'failed',
                message: hourlyServices.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                count: hourlyServices.length,
                data: hourlyServices,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async singleHourlyService(id) {
        var _a, _b;
        try {
            const singleHourlyService = await this.prismaService.hourly_services.findUnique({
                where: {
                    id: Number(id),
                },
            });
            return {
                status: singleHourlyService ? 'success' : 'failed',
                message: singleHourlyService
                    ? 'Record found successfully!'
                    : 'No record found!',
                data: singleHourlyService || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateHourlyService(id, body) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updateHourlyService = await this.prismaService.hourly_services.update({
                where: {
                    id: Number(id),
                },
                data: Object.assign(Object.assign({}, body), { updated_at }),
            });
            return {
                status: updateHourlyService ? 'success' : 'failed',
                message: updateHourlyService
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateHourlyService,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteHourlyService(id) {
        var _a, _b;
        try {
            const deleteHourlyService = await this.prismaService.hourly_services.delete({
                where: {
                    id: Number(id),
                },
            });
            if (!deleteHourlyService) {
                throw new common_1.HttpException({ status: 'failed', message: 'Not deleted!' }, common_1.HttpStatus.NOT_IMPLEMENTED);
            }
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
HourlyServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HourlyServicesService);
exports.HourlyServicesService = HourlyServicesService;
//# sourceMappingURL=hourly_services.service.js.map