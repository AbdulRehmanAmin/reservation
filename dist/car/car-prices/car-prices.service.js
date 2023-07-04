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
exports.CarPricesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let CarPricesService = class CarPricesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCarPriceDto) {
        try {
            const response = await this.prismaService.car_prices.create({
                data: {
                    car_id: createCarPriceDto.car_id,
                    car_price_type_id: createCarPriceDto.car_price_type_id,
                    monday: createCarPriceDto.monday,
                    tuesday: createCarPriceDto.tuesday,
                    wednesday: createCarPriceDto.wednesday,
                    thursday: createCarPriceDto.thursday,
                    friday: createCarPriceDto.friday,
                    saturday: createCarPriceDto.saturday,
                    sunday: createCarPriceDto.sunday,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            });
            return {
                status: response ? 'success' : 'failed',
                message: response
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: response,
            };
        }
        catch (err) {
            throw new common_1.HttpException((err === null || err === void 0 ? void 0 : err.meta.target) || (err === null || err === void 0 ? void 0 : err.cause) || 'Internal server error', (err === null || err === void 0 ? void 0 : err.status) || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const carPrices = await this.prismaService.car_prices.findMany({
                include: {
                    cars: {
                        select: {
                            name: true,
                        },
                    },
                    car_price_types: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            const res = carPrices.map((car) => {
                return {
                    id: car.id,
                    car_id: car.car_id,
                    car_price_type_id: car.car_price_type_id,
                    monday: car.monday,
                    tuesday: car.tuesday,
                    wednesday: car.wednesday,
                    thursday: car.thursday,
                    friday: car.friday,
                    saturday: car.saturday,
                    sunday: car.sunday,
                    car_name: car.cars.name,
                    car_price_type_name: car.car_price_types.name,
                    created_at: car.created_at,
                    updated_at: car.updated_at,
                };
            });
            return {
                status: 'success',
                message: res.length > 0 ? 'Records found successfully!' : 'No records found!',
                data: res.length > 0 ? res : [],
            };
        }
        catch (err) {
            throw new common_1.HttpException((err === null || err === void 0 ? void 0 : err.meta.target) || (err === null || err === void 0 ? void 0 : err.cause) || 'Internal server error', (err === null || err === void 0 ? void 0 : err.status) || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        var _a, _b;
        try {
            const carPrice = await this.prismaService.car_prices.findMany({
                where: {
                    car_id: id,
                },
            });
            const filteredHourlyArray = carPrice.filter(obj => obj.car_price_type_id === 1);
            const filteredMilesArray = carPrice.filter(obj => obj.car_price_type_id === 2);
            return {
                status: carPrice ? 'success' : 'failed',
                message: carPrice ? 'Records found successfully!' : 'No records found!',
                data: carPrice || {},
                filteredHourlyArray,
                filteredMilesArray
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCarPriceDto) {
        var _a, _b;
        try {
            const carPrice = await this.prismaService.car_prices.update({
                where: {
                    id: id,
                },
                data: {
                    car_id: updateCarPriceDto.car_id,
                    car_price_type_id: updateCarPriceDto.car_price_type_id,
                    monday: updateCarPriceDto.monday,
                    tuesday: updateCarPriceDto.tuesday,
                    wednesday: updateCarPriceDto.wednesday,
                    thursday: updateCarPriceDto.thursday,
                    friday: updateCarPriceDto.friday,
                    saturday: updateCarPriceDto.saturday,
                    sunday: updateCarPriceDto.sunday,
                    updated_at: new Date().toISOString(),
                },
            });
            return {
                status: carPrice ? 'success' : 'failed',
                message: carPrice
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: carPrice,
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
            await this.prismaService.car_prices.delete({
                where: {
                    id: id,
                },
            });
            return {
                status: 'success',
                message: 'Car price deleted successfully!',
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
CarPricesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarPricesService);
exports.CarPricesService = CarPricesService;
//# sourceMappingURL=car-prices.service.js.map