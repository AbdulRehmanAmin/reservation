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
exports.AirportServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let AirportServicesService = class AirportServicesService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async create(body) {
        var _a, _b;
        try {
            if (!body.service_id) {
                throw new common_1.HttpException({
                    status: 'failed',
                    message: '(service_id) must required!',
                }, common_1.HttpStatus.NOT_IMPLEMENTED);
            }
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const newAirport = await this.prismaService.airport_services.create({
                data: {
                    name: body.name,
                    description: body.description,
                    pickup_dropoff: body.pickup_dropoff,
                    pickup_date_time: body.pickup_date_time,
                    num_passengers: body.num_passengers,
                    pickup_from: body.pickup_from,
                    dropoff_location: body.dropoff_location,
                    airline: body.airline,
                    flight_number: body.flight_number,
                    status: body.status,
                    service_id: body.service_id,
                    pick_up_lat: body.pick_up_lat,
                    pick_up_lon: body.pick_up_lon,
                    drop_off_lat: body.drop_off_lat,
                    drop_off_lon: body.drop_off_lon
                }
            });
            return {
                status: newAirport ? 'success' : 'failed',
                message: newAirport ? 'Record created successfully!' : 'No record created!',
                data: newAirport,
            };
        }
        catch (err) {
            console.log("----------->", err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const ApServices = await this.prismaService.airport_services.findMany();
            return {
                status: ApServices.length > 0 ? 'success' : 'failed',
                message: ApServices.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: ApServices,
            };
        }
        catch (err) {
            console.log("---------> ", err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ;
    }
    async findOne(id) {
        var _a, _b;
        try {
            const ApServices = await this.prismaService.airport_services.findUnique({
                where: {
                    id: Number(id),
                },
            });
            return {
                status: ApServices ? 'success' : 'failed',
                message: ApServices
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: ApServices,
            };
        }
        catch (err) {
            console.log("---------> ", err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ;
    }
    async update(id, body) {
        var _a, _b;
        try {
            const updateApService = await this.prismaService.airport_services.update({
                where: {
                    id,
                },
                data: Object.assign({}, body),
            });
            return {
                status: updateApService ? 'success' : 'failed',
                message: updateApService
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateApService,
            };
        }
        catch (err) {
            console.log("------> Erorr", err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        var _a, _b;
        try {
            await this.prismaService.airport_services.delete({
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
AirportServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AirportServicesService);
exports.AirportServicesService = AirportServicesService;
//# sourceMappingURL=airport_services.service.js.map