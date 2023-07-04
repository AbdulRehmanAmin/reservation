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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CarService = class CarService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCarDto) {
        var _a, _b, _c;
        try {
            let pic = (_a = createCarDto === null || createCarDto === void 0 ? void 0 : createCarDto.pic) !== null && _a !== void 0 ? _a : null;
            const newCar = await this.prismaService.cars.create({
                data: {
                    body_type_id: createCarDto.body_type_id,
                    transmission_id: createCarDto.transmission_id,
                    manufacturer_id: createCarDto.manufacturer_id,
                    driver_id: createCarDto.driver_id,
                    fuel_id: createCarDto.fuel_id,
                    vehicle_type_id: createCarDto.vehicle_type_id,
                    car_model: createCarDto.car_model,
                    name: createCarDto.name,
                    qty: createCarDto.qty,
                    passenger_seats: createCarDto.passenger_seats,
                    maximum_luggage: createCarDto.maximum_luggage,
                    total_doors: createCarDto.total_doors,
                    child_seat: createCarDto.child_seat,
                    image: pic,
                    status: createCarDto.status,
                    per_mile_rate: createCarDto.per_mile_rate,
                    hourly_rate: createCarDto.hourly_rate,
                    minimum_fare: createCarDto.minimum_fare,
                    minimum_hours: createCarDto.minimum_hours,
                    fixed_price: createCarDto.fixed_price,
                    is_slab_enabled: createCarDto.is_slab_enabled,
                    is_loc_enabled: createCarDto.is_loc_enabled,
                    car_type: createCarDto.car_type,
                },
            });
            const slabs = createCarDto.slabs;
            const features = createCarDto.features;
            if (createCarDto.is_slab_enabled && slabs.length > 0) {
                const res = slabs.map((slab) => {
                    return {
                        initial_distance: +slab.initial_distance,
                        final_distance: +slab.final_distance,
                        price: +slab.price,
                        car_id: newCar.id,
                    };
                });
                await this.prismaService.slabs.createMany({
                    data: res,
                });
            }
            if (createCarDto.is_car_details_enabled) {
                const { car_hourly_details, car_per_mile_details } = createCarDto !== null && createCarDto !== void 0 ? createCarDto : {};
                let carPriceTypeId = 0;
                if (Object.values(car_hourly_details).every((val) => +val !== 0) &&
                    Object.values(car_per_mile_details).every((val) => +val !== 0)) {
                    carPriceTypeId = 1;
                    const carPricesHourly = {
                        car_id: newCar.id,
                        car_price_type_id: carPriceTypeId,
                        monday: +car_hourly_details.monday,
                        tuesday: +car_hourly_details.tuesday,
                        wednesday: +car_hourly_details.wednesday,
                        thursday: +car_hourly_details.thursday,
                        friday: +car_hourly_details.friday,
                        saturday: +car_hourly_details.saturday,
                        sunday: +car_hourly_details.sunday,
                    };
                    await this.prismaService.car_prices.create({
                        data: carPricesHourly,
                    });
                    carPriceTypeId = 2;
                    const carPricesPerMile = {
                        car_id: newCar.id,
                        car_price_type_id: carPriceTypeId,
                        monday: +car_per_mile_details.monday,
                        tuesday: +car_per_mile_details.tuesday,
                        wednesday: +car_per_mile_details.wednesday,
                        thursday: +car_per_mile_details.thursday,
                        friday: +car_per_mile_details.friday,
                        saturday: +car_per_mile_details.saturday,
                        sunday: +car_per_mile_details.sunday,
                    };
                    await this.prismaService.car_prices.create({
                        data: carPricesPerMile,
                    });
                }
                else if (Object.values(car_hourly_details).every((val) => +val !== 0) ||
                    Object.values(car_per_mile_details).every((val) => +val !== 0)) {
                    carPriceTypeId = Object.values(car_hourly_details).every((val) => +val !== 0)
                        ? 1
                        : 2;
                    const carDetails = Object.values(car_hourly_details).every((val) => +val !== 0)
                        ? car_hourly_details
                        : car_per_mile_details;
                    const carPrices = {
                        car_id: newCar.id,
                        car_price_type_id: carPriceTypeId,
                        monday: +carDetails.monday,
                        tuesday: +carDetails.tuesday,
                        wednesday: +carDetails.wednesday,
                        thursday: +carDetails.thursday,
                        friday: +carDetails.friday,
                        saturday: +carDetails.saturday,
                        sunday: +carDetails.sunday,
                    };
                    await this.prismaService.car_prices.create({
                        data: carPrices,
                    });
                }
            }
            if (features.length > 0) {
                const res = features.map((feature) => {
                    return {
                        car_id: newCar.id,
                        feature_id: +feature,
                    };
                });
                await this.prismaService.car_features.createMany({
                    data: res,
                });
            }
            return {
                status: newCar ? 'success' : 'failed',
                message: newCar ? 'Record created successfully!' : 'No record created!',
                data: { newCar },
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.target) || ((_c = err === null || err === void 0 ? void 0 : err.meta) === null || _c === void 0 ? void 0 : _c.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const allCars = await this.prismaService.cars.findMany({
                include: {
                    transmissions: {
                        select: {
                            transmission: true,
                        },
                    },
                    manufacturers: {
                        select: {
                            Manufacturer: true,
                        },
                    },
                    body_types: {
                        select: {
                            body_type: true,
                        },
                    },
                    fuel_types: {
                        select: {
                            fuel_type: true,
                        },
                    },
                    drivers: {
                        select: {
                            name: true,
                        },
                    },
                    vehicle_types: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            const res = allCars.map((car) => {
                return {
                    id: car.id,
                    body_type_id: car.body_type_id,
                    transmission_id: car.transmission_id,
                    manufacturer_id: car.manufacturer_id,
                    driver_id: car.driver_id,
                    car_model: car.car_model,
                    name: car.name,
                    passenger_seats: car.passenger_seats,
                    maximum_luggage: car.maximum_luggage,
                    total_doors: car.total_doors,
                    child_seat: car.child_seat,
                    image: car.image,
                    qty: car.qty,
                    status: car.status,
                    per_mile_rate: car.per_mile_rate,
                    hourly_rate: car.hourly_rate,
                    minimum_fare: car.minimum_fare,
                    maximum_hours: car.minimum_hours,
                    fixed_price: car.fixed_price,
                    is_slab_enabled: car.is_slab_enabled,
                    body_type: car.body_types.body_type,
                    transmission: car.transmissions.transmission,
                    manufacturer: car.manufacturers.Manufacturer,
                    fuel_type: car.fuel_types.fuel_type,
                    driver: car.drivers.name,
                    vehicle_type: car.vehicle_types.name,
                    created_at: car.created_at,
                    updated_at: car.updated_at,
                    car_type: car === null || car === void 0 ? void 0 : car.car_type,
                };
            });
            return {
                status: res.length > 0 ? 'success' : 'failed',
                message: res.length > 0 ? 'Records found successfully!' : 'No records found!',
                data: res,
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
    async findOne(id) {
        var _a, _b;
        try {
            const car = await this.prismaService.cars.findUnique({
                where: { id },
            });
            const slabs = await this.prismaService.slabs.findMany({
                where: {
                    car_id: id,
                },
                select: {
                    id: true,
                    initial_distance: true,
                    final_distance: true,
                    price: true,
                },
            });
            return {
                status: car ? 'success' : 'failed',
                message: car ? 'Record found successfully!' : 'No record found!',
                data: Object.assign(Object.assign({}, car), { slabs }) || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCarDto) {
        var _a, _b;
        try {
            const singleCar = await this.prismaService.cars.findUnique({
                where: {
                    id,
                },
            });
            console.log(updateCarDto.status);
            const updateCar = await this.prismaService.cars.update({
                where: {
                    id,
                },
                data: {
                    body_type_id: Number(updateCarDto.body_type_id) || singleCar.body_type_id,
                    transmission_id: Number(updateCarDto.transmission_id) || singleCar.transmission_id,
                    manufacturer_id: Number(updateCarDto.manufacturer_id) || singleCar.manufacturer_id,
                    driver_id: Number(updateCarDto.driver_id) || singleCar.driver_id,
                    fuel_id: Number(updateCarDto.fuel_id) || singleCar.fuel_id,
                    vehicle_type_id: Number(updateCarDto.vehicle_type_id) || singleCar.vehicle_type_id,
                    car_model: updateCarDto.car_model || singleCar.car_model,
                    name: updateCarDto.name || singleCar.name,
                    qty: updateCarDto.qty || singleCar.qty,
                    passenger_seats: Number(updateCarDto.passenger_seats) || singleCar.passenger_seats,
                    maximum_luggage: Number(updateCarDto.maximum_luggage) || singleCar.maximum_luggage,
                    image: updateCarDto.image || singleCar.image,
                    total_doors: Number(updateCarDto.total_doors) || singleCar.total_doors,
                    child_seat: Number(updateCarDto.child_seat) || singleCar.child_seat,
                    status: updateCarDto.status,
                    per_mile_rate: Number(updateCarDto.per_mile_rate) || singleCar.per_mile_rate,
                    hourly_rate: Number(updateCarDto.hourly_rate) || singleCar.hourly_rate,
                    minimum_fare: Number(updateCarDto.minimum_fare) || singleCar.minimum_fare,
                    minimum_hours: Number(updateCarDto.minimum_hours) || singleCar.minimum_hours,
                    fixed_price: Number(updateCarDto.fixed_price) || singleCar.fixed_price,
                    car_type: updateCarDto.car_type || singleCar.car_type,
                },
            });
            return {
                status: updateCar ? 'success' : 'failed',
                message: updateCar
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateCar,
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
            const deleteCar = await this.prismaService.cars.update({
                where: {
                    id: id,
                },
                data: {
                    isActive: false,
                },
            });
            return {
                status: 'success',
                message: 'Record deleted successfully!',
                data: null,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addSlab(car_id, dto) {
        var _a, _b;
        try {
            const carExists = await this.prismaService.cars.findUnique({
                where: {
                    id: car_id,
                },
            });
            if (!carExists) {
                return {
                    status: 'failed',
                    message: 'Car does not exist! with id: ' + car_id,
                    data: {},
                };
            }
            const slabExists = await this.prismaService.slabs.findFirst({
                where: {
                    car_id,
                    initial_distance: dto.initial_distance,
                    final_distance: dto.final_distance,
                },
            });
            if (slabExists) {
                return {
                    status: 'failed',
                    message: 'Slab already exists!',
                    data: {},
                };
            }
            const newSlab = await this.prismaService.slabs.create({
                data: Object.assign({ car_id }, dto),
            });
            return {
                status: newSlab ? 'success' : 'failed',
                message: newSlab
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newSlab,
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
    async updateSlab(id, dto) {
        var _a, _b;
        try {
            const updateSlab = await this.prismaService.slabs.update({
                where: {
                    id: id,
                },
                data: Object.assign({}, dto),
            });
            return {
                status: updateSlab ? 'success' : 'failed',
                message: updateSlab
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateSlab,
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
    async deleteSlab(id) {
        var _a, _b;
        try {
            const deleteSlab = await this.prismaService.slabs.delete({
                where: {
                    id,
                },
            });
            return {
                status: 'success',
                message: 'Record deleted successfully!',
                data: deleteSlab,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCarByType(type) {
        var _a, _b;
        try {
            const carsResponse = await this.prismaService.cars.findMany({
                where: {
                    AND: [{ car_type: { equals: type } }, { isActive: true }],
                },
            });
            return {
                status: carsResponse.length ? 'success' : 'failed',
                message: carsResponse.length
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: carsResponse,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) ||
                    ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) ||
                    (err === null || err === void 0 ? void 0 : err.message) ||
                    'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map