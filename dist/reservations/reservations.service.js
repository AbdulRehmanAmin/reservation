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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const create_admin_reservation_dto_1 = require("./dto/create-admin-reservation.dto");
const moment = require("moment-timezone");
let ReservationsService = class ReservationsService {
    constructor(prismaService, httpService, configService) {
        this.prismaService = prismaService;
        this.httpService = httpService;
        this.configService = configService;
    }
    async adminReservation(createReservationDto) {
        var _a, _b;
        try {
            console.log('Usama bhi APi hit', create_admin_reservation_dto_1.CreateAdminReservationDto);
            const newReservation = await this.prismaService.reservations.create({
                data: {
                    service_id: createReservationDto.service_id,
                    car_id: createReservationDto.car_id,
                    order_number: createReservationDto.order_number,
                    pick_up_loc_name: createReservationDto.pick_up_loc_name,
                    pick_up_postal_code: null,
                    pick_up_lat: null,
                    pick_up_lon: null,
                    drop_off_loc_name: createReservationDto.drop_off_loc_name,
                    drop_off_postal_code: null,
                    drop_off_lat: null,
                    drop_off_lon: null,
                    airline: createReservationDto.airline,
                    flight_no: createReservationDto.flight_no,
                    no_of_hours: null,
                    pick_up_date: createReservationDto.pick_up_date,
                    price: createReservationDto.price,
                    tax: createReservationDto.tax,
                    customer_first_name: null,
                    customer_last_name: null,
                    customer_phone: null,
                    customer_cnic: null,
                    customer_email: null,
                    maximum_passenger: createReservationDto.maximum_passenger,
                    maximum_luggage: createReservationDto.maximum_luggage,
                    special_instruction: createReservationDto.special_instruction,
                },
            });
            return {
                status: newReservation ? 'success' : 'failed',
                message: newReservation
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newReservation,
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
    async create(createReservationDto) {
        var _a, _b, _c;
        try {
            const order_number = `RES-${this.generateRandomID()}`;
            let data = {
                service_id: createReservationDto.sub_service_id,
                car_id: (_a = createReservationDto === null || createReservationDto === void 0 ? void 0 : createReservationDto.car_id) !== null && _a !== void 0 ? _a : null,
                order_number: order_number,
                pick_up_loc_name: createReservationDto.pick_up_loc_name,
                pick_up_postal_code: createReservationDto.pick_up_postal_code,
                pick_up_lat: createReservationDto.pick_up_lat,
                pick_up_lon: createReservationDto.pick_up_long,
                drop_off_loc_name: createReservationDto.drop_off_loc_name,
                drop_off_postal_code: createReservationDto.drop_off_postal_code,
                drop_off_lat: createReservationDto.drop_off_lat,
                drop_off_lon: createReservationDto.drop_off_long,
                airline: createReservationDto.airline,
                flight_no: createReservationDto.flight_no,
                no_of_hours: createReservationDto.no_of_hours,
                pick_up_date: createReservationDto.pick_up_date,
                price: createReservationDto.price,
                tax: createReservationDto.tax,
                customer_first_name: createReservationDto.customer_first_name,
                customer_last_name: createReservationDto.customer_last_name,
                customer_phone: createReservationDto.customer_phone,
                customer_cnic: createReservationDto.customer_phone,
                customer_email: createReservationDto.customer_email,
                maximum_passenger: createReservationDto.maximum_passenger,
                maximum_luggage: createReservationDto.maximum_luggage,
                special_instruction: createReservationDto.special_request
            };
            if (createReservationDto.car_id === null) {
                delete data.car_id;
            }
            const newReservation = await this.prismaService.reservations.create({
                data,
            });
            return {
                status: newReservation ? 'success' : 'failed',
                message: newReservation
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newReservation,
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.target) || ((_c = err === null || err === void 0 ? void 0 : err.meta) === null || _c === void 0 ? void 0 : _c.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const allReservations = await this.prismaService.reservations.findMany({
                include: {
                    sub_services: {
                        select: {
                            name: true,
                        },
                    },
                    cars: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            const res = allReservations.map((reservation) => {
                return {
                    id: reservation.id,
                    service_id: reservation.service_id,
                    car_id: reservation.car_id,
                    pick_up_loc_name: reservation.pick_up_loc_name,
                    pick_up_postal_code: reservation.pick_up_postal_code,
                    pick_up_lat: reservation.pick_up_lat,
                    pick_up_lon: reservation.pick_up_lon,
                    drop_off_loc_name: reservation.drop_off_loc_name,
                    drop_off_postal_code: reservation.drop_off_postal_code,
                    drop_off_lat: reservation.drop_off_lat,
                    drop_off_lon: reservation.drop_off_lon,
                    airline: reservation.airline,
                    flight_no: reservation.flight_no,
                    pick_up_date: reservation.pick_up_date,
                    no_of_hours: reservation.no_of_hours,
                    price: reservation.price,
                    tax: reservation.tax,
                    customer_first_name: reservation.customer_first_name,
                    customer_last_name: reservation.customer_last_name,
                    customer_phone: reservation.customer_phone,
                    customer_cnic: reservation.customer_phone,
                    customer_email: reservation.customer_email,
                    maximum_passenger: reservation.maximum_passenger,
                    maximum_luggage: reservation.maximum_luggage,
                    service_name: reservation.sub_services.name,
                    car_name: reservation.cars.name,
                    created_at: reservation.created_at,
                    updated_at: reservation.updated_at,
                    isPaid: reservation.isPaid,
                    specialInstruction: reservation.special_instruction
                };
            });
            return {
                status: allReservations.length > 0 ? 'success' : 'failed',
                message: allReservations.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: res,
            };
        }
        catch (err) {
            console.log("ERROR:", err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        var _a, _b;
        try {
            const reservation = await this.prismaService.reservations.findUnique({
                where: { id },
            });
            return {
                status: reservation ? 'success' : 'failed',
                message: reservation
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: reservation || {},
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateReservationDto) {
        var _a, _b;
        try {
            const singleRsrv = await this.prismaService.reservations.findUnique({
                where: {
                    id,
                },
            });
            const updateReservation = await this.prismaService.reservations.update({
                where: { id },
                data: {
                    service_id: updateReservationDto.sub_service_id || singleRsrv.service_id,
                    car_id: updateReservationDto.car_id || singleRsrv.car_id,
                    pick_up_loc_name: updateReservationDto.pick_up_loc_name ||
                        singleRsrv.pick_up_loc_name,
                    pick_up_postal_code: updateReservationDto.pick_up_postal_code ||
                        singleRsrv.pick_up_postal_code,
                    pick_up_lat: updateReservationDto.pick_up_lat || singleRsrv.pick_up_lat,
                    pick_up_lon: updateReservationDto.pick_up_lon || singleRsrv.pick_up_lon,
                    drop_off_loc_name: updateReservationDto.drop_off_loc_name ||
                        singleRsrv.drop_off_loc_name,
                    drop_off_postal_code: updateReservationDto.drop_off_postal_code ||
                        singleRsrv.drop_off_postal_code,
                    drop_off_lat: updateReservationDto.drop_off_lat || singleRsrv.drop_off_lat,
                    drop_off_lon: updateReservationDto.drop_off_long || singleRsrv.drop_off_lon,
                    airline: updateReservationDto.airline || singleRsrv.airline,
                    flight_no: updateReservationDto.flight_no || singleRsrv.flight_no,
                    pick_up_date: updateReservationDto.pick_up_date || singleRsrv.pick_up_date,
                    no_of_hours: updateReservationDto.no_of_hours || singleRsrv.no_of_hours,
                    price: updateReservationDto.price || singleRsrv.price,
                    tax: updateReservationDto.tax || singleRsrv.tax,
                    customer_first_name: updateReservationDto.customer_first_name ||
                        singleRsrv.customer_first_name,
                    customer_last_name: updateReservationDto.customer_last_name ||
                        singleRsrv.customer_last_name,
                    customer_phone: updateReservationDto.customer_phone || singleRsrv.customer_phone,
                    customer_cnic: updateReservationDto.customer_phone || singleRsrv.customer_cnic,
                    customer_email: updateReservationDto.customer_email || singleRsrv.customer_email,
                    maximum_passenger: updateReservationDto.maximum_passenger ||
                        singleRsrv.maximum_passenger,
                    maximum_luggage: updateReservationDto.maximum_luggage || singleRsrv.maximum_luggage,
                },
            });
            return {
                status: updateReservation ? 'success' : 'failed',
                message: updateReservation
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateReservation,
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
            await this.prismaService.reservations.delete({
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
    async getCarsByService(dto) {
        var _a, _b, _c, _d, _e, _f;
        try {
            let cars = [];
            let tax = 0;
            let sub_serviceId = dto.sub_service_id;
            let passenger = dto.maximum_passenger;
            let luggage = dto.maximum_luggage;
            const service_id = await this.prismaService.sub_services.findFirst({
                where: {
                    id: sub_serviceId,
                    isActive: true,
                },
                select: {
                    service_id: true,
                },
            });
            if (!service_id) {
                return {
                    status: 'failed',
                    message: 'Record Not Found',
                    data: null,
                    error: true,
                };
            }
            let serviceId = service_id.service_id;
            const serviceTax = await this.prismaService.gratuities.findFirst({
                where: {
                    service_id: serviceId,
                },
            });
            const serviceTaxList = await this.prismaService.gratuities.findMany({
                where: {
                    service_id: serviceId,
                },
                select: {
                    price: true,
                    percentage: true,
                    name: true,
                },
            });
            if ((serviceId && serviceId === 1) ||
                (serviceId && serviceId === 2) ||
                (serviceId && serviceId === 6)) {
                let pickUpPostalCode = dto.pick_up_postal_code;
                let dropOffPostalCode = dto.drop_off_postal_code;
                let pickUpLat = dto.pick_up_lat;
                let pickUpLong = dto.pick_up_long;
                let dropOffLat = dto.drop_off_lat;
                let dropOffLong = dto.drop_off_long;
                cars = await this.prismaService.cars.findMany({
                    where: {
                        maximum_luggage: {
                            gte: dto.maximum_luggage,
                        },
                        passenger_seats: {
                            gte: dto.maximum_passenger,
                        },
                        car_type: 'Other',
                    },
                    include: {
                        slabs: true,
                        car_prices: true,
                    },
                    orderBy: {
                        fixed_price: 'asc',
                    },
                });
                let locationExceptions = await this.prismaService.location_exceptions.findFirst({
                    where: {
                        pick_up_postal_code: pickUpPostalCode,
                        drop_off_postal_code: dropOffPostalCode,
                    },
                });
                if (!locationExceptions) {
                    locationExceptions =
                        await this.prismaService.location_exceptions.findFirst({
                            where: {
                                pick_up_postal_code: dropOffPostalCode,
                                drop_off_postal_code: pickUpPostalCode,
                            },
                        });
                }
                if (locationExceptions) {
                    cars = cars.map((car) => {
                        let actualFair = car.fixed_price + locationExceptions.price;
                        const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                        return {
                            id: car.id,
                            name: car.name,
                            base_price: Number(actualFair.toFixed(2)),
                            tax: Number(calculatedTax.tax.toFixed(2)),
                            price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                            image: car.image,
                            passengers: car.passenger_seats,
                            luggages: car.maximum_luggage,
                            service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                        };
                    });
                }
                else {
                    let totalMiles = await this.getMapBoxDistance(pickUpLat, pickUpLong, dropOffLat, dropOffLong);
                    cars = cars === null || cars === void 0 ? void 0 : cars.map((car) => {
                        var _a;
                        if ((car === null || car === void 0 ? void 0 : car.slabs.length) > 0) {
                            let filteredSlab = car.slabs.find((slab) => {
                                return (slab.initial_distance <= totalMiles &&
                                    slab.final_distance >= totalMiles);
                            });
                            if (filteredSlab) {
                                let slabPrice = filteredSlab === null || filteredSlab === void 0 ? void 0 : filteredSlab.price;
                                let actualFair = slabPrice * totalMiles + (car === null || car === void 0 ? void 0 : car.fixed_price);
                                const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                                if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(actualFair.toFixed(2)),
                                        tax: Number(calculatedTax.tax.toFixed(2)),
                                        price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                                else {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(car.minimum_fare.toFixed(2)),
                                        tax: Number(car.minimum_fare.toFixed(2)),
                                        price: Number(car.minimum_fare.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                            }
                            else {
                                let actualFair = car.per_mile_rate * totalMiles + (car === null || car === void 0 ? void 0 : car.fixed_price);
                                const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                                if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(actualFair.toFixed(2)),
                                        tax: Number(calculatedTax.tax.toFixed(2)),
                                        price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                                else {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(car.minimum_fare.toFixed(2)),
                                        tax: Number(car.minimum_fare.toFixed(2)),
                                        price: Number(car.minimum_fare.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                            }
                        }
                        else if ((car === null || car === void 0 ? void 0 : car.car_prices.length) > 0) {
                            const date = new Date(dto.pick_up_date);
                            const options = { weekday: 'long', timeZone: 'UTC' };
                            const dayOfWeek = date.toLocaleDateString('en-US', options);
                            const carPriceDetails = car === null || car === void 0 ? void 0 : car.car_prices.find((price) => price.car_price_type_id === 2);
                            if (carPriceDetails) {
                                const finalPrice = (_a = carPriceDetails[dayOfWeek.toLowerCase()]) !== null && _a !== void 0 ? _a : car.per_mile_rate;
                                let actualFair = finalPrice * totalMiles + (car === null || car === void 0 ? void 0 : car.fixed_price);
                                const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                                if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(actualFair.toFixed(2)),
                                        tax: Number(calculatedTax.tax.toFixed(2)),
                                        price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                            }
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(car.minimum_fare.toFixed(2)),
                                tax: Number(car.minimum_fare.toFixed(2)),
                                price: Number(car.minimum_fare.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                        else {
                            let actualFair = car.per_mile_rate * totalMiles + (car === null || car === void 0 ? void 0 : car.fixed_price);
                            const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                            if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                                return {
                                    id: car.id,
                                    name: car.name,
                                    base_price: Number(actualFair.toFixed(2)),
                                    tax: Number(calculatedTax.tax.toFixed(2)),
                                    price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                    image: car.image,
                                    passengers: car.passenger_seats,
                                    luggages: car.maximum_luggage,
                                    service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                };
                            }
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(car.minimum_fare.toFixed(2)),
                                tax: Number(car.minimum_fare.toFixed(2)),
                                price: Number(car.minimum_fare.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                    });
                }
            }
            else if (serviceId && serviceId === 3) {
                let noOfHours = dto.no_of_hours;
                cars = await this.prismaService.cars.findMany({
                    where: {
                        minimum_hours: {
                            lte: noOfHours,
                        },
                        maximum_luggage: {
                            gte: dto.maximum_luggage,
                        },
                        passenger_seats: {
                            gte: dto.maximum_passenger,
                        },
                        car_type: 'Other',
                    },
                    include: {
                        car_prices: true,
                    },
                });
                if (cars.length == 0) {
                    cars = await this.prismaService.cars.findMany({
                        where: {
                            minimum_hours: {
                                gte: noOfHours,
                            },
                            maximum_luggage: {
                                gte: dto.maximum_luggage,
                            },
                            passenger_seats: {
                                gte: dto.maximum_passenger,
                            },
                            car_type: 'Other',
                        },
                        include: {
                            car_prices: true,
                        },
                    });
                }
                cars = cars === null || cars === void 0 ? void 0 : cars.map((car) => {
                    var _a, _b;
                    if ((car === null || car === void 0 ? void 0 : car.car_prices.length) > 0) {
                        let countHours = -1;
                        if (noOfHours > 24) {
                            countHours = noOfHours / 24;
                        }
                        let date = new Date(dto.pick_up_date);
                        let calculatedTax = 0.0;
                        let calculatedTaxObject = [];
                        while (countHours > 0) {
                            const options = { weekday: 'long', timeZone: 'UTC' };
                            const dayOfWeek = date.toLocaleDateString('en-US', options);
                            const carPriceDetails = car === null || car === void 0 ? void 0 : car.car_prices.find((price) => price.car_price_type_id === 1);
                            date.setDate(date.getDate() + 1);
                            countHours--;
                            if (carPriceDetails) {
                                const finalPrice = (_a = carPriceDetails[dayOfWeek.toLowerCase()]) !== null && _a !== void 0 ? _a : car.hourly_rate;
                                let actualFair = finalPrice * car.hourly_rate;
                                const tax = this.calculateTax(serviceTaxList, actualFair);
                                calculatedTaxObject.push(tax);
                                calculatedTax += tax.calculatedPrice;
                            }
                        }
                        if (calculatedTax > 0.0 && calculatedTax > car.minimum_fare) {
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(calculatedTaxObject[0].calculatedPrice.toFixed(2)),
                                tax: Number(calculatedTaxObject[0].tax.toFixed(2)),
                                price: Number(calculatedTax.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                        else if (noOfHours <= 24 &&
                            countHours <= -1 &&
                            calculatedTax === 0.0) {
                            const options = { weekday: 'long', timeZone: 'UTC' };
                            const dayOfWeek = date.toLocaleDateString('en-US', options);
                            const carPriceDetails = car === null || car === void 0 ? void 0 : car.car_prices.find((price) => price.car_price_type_id === 1);
                            if (carPriceDetails) {
                                const finalPrice = (_b = carPriceDetails[dayOfWeek.toLowerCase()]) !== null && _b !== void 0 ? _b : car.hourly_rate;
                                let actualFair = finalPrice * car.hourly_rate;
                                const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                                if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                                    return {
                                        id: car.id,
                                        name: car.name,
                                        base_price: Number(actualFair.toFixed(2)),
                                        tax: Number(calculatedTax.tax.toFixed(2)),
                                        price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                        image: car.image,
                                        passengers: car.passenger_seats,
                                        luggages: car.maximum_luggage,
                                        service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                    };
                                }
                                return {
                                    id: car.id,
                                    name: car.name,
                                    base_price: Number(car.minimum_fare.toFixed(2)),
                                    tax: Number(car.minimum_fare.toFixed(2)),
                                    price: Number(car.minimum_fare.toFixed(2)),
                                    image: car.image,
                                    passengers: car.passenger_seats,
                                    luggages: car.maximum_luggage,
                                    service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                                };
                            }
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(car.minimum_fare.toFixed(2)),
                                tax: Number(car.minimum_fare.toFixed(2)),
                                price: Number(car.minimum_fare.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                        else {
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(car.minimum_fare.toFixed(2)),
                                tax: Number(car.minimum_fare.toFixed(2)),
                                price: Number(car.minimum_fare.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                    }
                    else {
                        let actualFair = car.hourly_rate * noOfHours;
                        const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
                        if ((calculatedTax === null || calculatedTax === void 0 ? void 0 : calculatedTax.calculatedPrice) >= car.minimum_fare) {
                            return {
                                id: car.id,
                                name: car.name,
                                base_price: Number(actualFair.toFixed(2)),
                                tax: Number(calculatedTax.tax.toFixed(2)),
                                price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                                image: car.image,
                                passengers: car.passenger_seats,
                                luggages: car.maximum_luggage,
                                service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                            };
                        }
                        return {
                            id: car.id,
                            name: car.name,
                            base_price: Number(car.minimum_fare.toFixed(2)),
                            tax: Number(car.minimum_fare.toFixed(2)),
                            price: Number(car.minimum_fare.toFixed(2)),
                            image: car.image,
                            passengers: car.passenger_seats,
                            luggages: car.maximum_luggage,
                            service_name: serviceTaxList !== null && serviceTaxList !== void 0 ? serviceTaxList : null,
                        };
                    }
                });
            }
            else if (serviceId && serviceId === 5) {
                const tour = await this.prismaService.sub_services.findFirst({
                    where: {
                        id: dto === null || dto === void 0 ? void 0 : dto.sub_service_id,
                    },
                    include: {
                        cars: true,
                    },
                });
                let tourTime = await this.prismaService.timeslots.findFirst({
                    where: {
                        id: dto.time,
                    },
                });
                let tourFinalTime = null;
                if (tourTime) {
                    tourFinalTime = moment(tourTime === null || tourTime === void 0 ? void 0 : tourTime.time)
                        .utc()
                        .format('YYYY-MM-DD HH:mm');
                }
                if (tour) {
                    const actualFare = tour.price_per_passenger * (dto === null || dto === void 0 ? void 0 : dto.maximum_passenger) +
                        ((_b = (_a = tour === null || tour === void 0 ? void 0 : tour.cars) === null || _a === void 0 ? void 0 : _a.fixed_price) !== null && _b !== void 0 ? _b : 0);
                    const { tax, calculatedPrice } = this.calculateTax(serviceTaxList, actualFare);
                    return {
                        status: tour ? 'success' : 'failed',
                        message: tour ? 'Records found successfully!' : 'No records found!',
                        data: Object.assign(Object.assign({}, tour), { time: tourFinalTime }),
                        tax: tax,
                        price: calculatedPrice,
                        base_price: calculatedPrice,
                        service_name: serviceTaxList,
                    };
                }
                else {
                    return {
                        status: tour ? 'success' : 'failed',
                        message: tour ? 'Records found successfully!' : 'No records found!',
                        data: tour,
                        tax: tax,
                        price: 0,
                        base_price: 0,
                        service_name: serviceTaxList,
                    };
                }
            }
            else if (serviceId && serviceId === 4) {
                const packagesList = await this.prismaService.sub_services.findFirst({
                    where: {
                        isActive: true,
                        id: sub_serviceId
                    },
                    include: {
                        cars: true,
                    },
                });
                if (packagesList) {
                    const price_per_passenger = packagesList.price_per_passenger;
                    const { tax, calculatedPrice } = this.calculateTax(serviceTaxList, (_d = packagesList.price_per_passenger + ((_c = packagesList.cars) === null || _c === void 0 ? void 0 : _c.fixed_price)) !== null && _d !== void 0 ? _d : 0);
                    delete packagesList.price_per_passenger;
                    return {
                        status: packagesList ? 'success' : 'failed',
                        message: packagesList
                            ? 'Records found successfully!'
                            : 'No records found!',
                        data: Object.assign(Object.assign({ tax, price: calculatedPrice }, packagesList), { base_price: calculatedPrice }),
                        service_name: serviceTaxList,
                    };
                }
                else {
                    return {
                        status: packagesList ? 'success' : 'failed',
                        message: packagesList
                            ? 'Records found successfully!'
                            : 'No records found!',
                        data: packagesList,
                        tax: tax,
                        price: 0,
                        service_name: serviceTaxList,
                    };
                }
            }
            if ((cars === null || cars === void 0 ? void 0 : cars.length) > 0) {
                cars = cars.filter((car) => car !== null && car);
                cars.sort((a, b) => a.base_price - b.base_price);
            }
            return {
                status: cars.length > 0 ? 'success' : 'failed',
                message: cars.length > 0 ? 'Records found successfully!' : 'No records found!',
                data: cars,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_e = err === null || err === void 0 ? void 0 : err.meta) === null || _e === void 0 ? void 0 : _e.target) || ((_f = err === null || err === void 0 ? void 0 : err.meta) === null || _f === void 0 ? void 0 : _f.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMapBoxDistance(pickUpLat, pickUpLong, dropOffLat, dropOffLong) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpLong}%2C${pickUpLat}%3B${dropOffLong}%2C${dropOffLat}?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${this.configService.get('MAPBOX_API_KEY')}`;
        try {
            const response = await this.httpService.axiosRef.get(url);
            return response.data.routes[0].distance / 1000;
        }
        catch (error) {
            console.error(`Error retrieving MapBox distance: ${error}`);
            return null;
        }
    }
    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
    calculateTax(serviceTaxList, actualFair) {
        let calculatedPrice = actualFair;
        let tax = 0;
        for (const serviceTax of serviceTaxList) {
            if ((serviceTax === null || serviceTax === void 0 ? void 0 : serviceTax.price) === 0) {
                tax = this.calculateTaxPercentage(actualFair, serviceTax.percentage);
                calculatedPrice = calculatedPrice + tax;
            }
            else if ((serviceTax === null || serviceTax === void 0 ? void 0 : serviceTax.percentage) === 0) {
                calculatedPrice = calculatedPrice + serviceTax.price;
                tax = serviceTax.price;
            }
            else {
                calculatedPrice = actualFair;
            }
        }
        return { tax, calculatedPrice };
    }
    calculateTaxPercentage(price, tax) {
        return (price * tax) / 100;
    }
    generateRandomID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomLetter = characters[randomIndex];
            id += randomLetter;
        }
        return id;
    }
};
ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService,
        config_1.ConfigService])
], ReservationsService);
exports.ReservationsService = ReservationsService;
//# sourceMappingURL=reservations.service.js.map