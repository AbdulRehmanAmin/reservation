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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const moment = require("moment-timezone");
const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
dayjs.extend(UTC);
let subServicesService = class subServicesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createSubService(body) {
        var _a, _b;
        try {
            let timeEntries, rembody;
            rembody = body;
            let time;
            if (body.time) {
                const { time: timeValue } = body, updatedBody = __rest(body, ["time"]);
                time = timeValue;
                rembody = updatedBody;
            }
            if (rembody.car_id === 0) {
                delete rembody.car_id;
            }
            const subService = await this.prismaService.sub_services.create({
                data: Object.assign(Object.assign({}, rembody), { created_at: new Date().toISOString() }),
            });
            if (body.service_id === 5) {
                timeEntries = await Promise.all(time.map(async (entry) => {
                    const timeSlot = await this.prismaService.timeslots.create({
                        data: {
                            time: new Date(entry).toISOString(),
                            sub_service_id: subService.id,
                            created_at: new Date().toISOString(),
                        },
                    });
                    return timeSlot;
                }));
            }
            return {
                status: subService ? 'success' : 'failed',
                message: subService
                    ? 'Records Created successfully!'
                    : 'No records Created!',
                data: subService,
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) ||
                    ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) ||
                    err.message ||
                    'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        var _a, _b;
        try {
            const sub_services = await this.prismaService.sub_services.findMany({
                where: {
                    isActive: true,
                },
                include: {
                    cars: { select: { car_model: true } },
                    services: { select: { Name: true } },
                    timeslots: true,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            sub_services.forEach(el => {
                if (el.timeslots) {
                    el.timeslots.forEach(slot => {
                        slot.time = moment(slot.time).utc().format('YYYY-MM-DD HH:mm');
                        return slot;
                    });
                }
            });
            return {
                status: sub_services.length ? 'success' : 'failed',
                totalRecords: sub_services.length,
                message: sub_services.length
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: sub_services,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id, param) {
        var _a, _b;
        try {
            let { limit, page, searchQuery } = param;
            let totalRecords = 0, service;
            if (id === 5) {
                if (searchQuery) {
                    totalRecords = await this.prismaService.sub_services.count({
                        where: {
                            AND: [
                                { name: { contains: searchQuery } },
                                { service_id: id },
                                { isActive: true },
                            ],
                        },
                    });
                    service = await this.prismaService.sub_services.findMany({
                        skip: (page - 1) * limit,
                        take: limit,
                        where: {
                            AND: [
                                { name: { contains: searchQuery } },
                                { service_id: id },
                                { isActive: true },
                            ],
                        },
                        orderBy: {
                            created_at: 'desc',
                        },
                        include: {
                            services: {
                                select: {
                                    Name: true,
                                },
                            },
                            timeslots: true,
                            cars: {
                                select: {
                                    name: true,
                                    car_model: true,
                                },
                            },
                        },
                    });
                }
                else {
                    totalRecords = await this.prismaService.sub_services.count({
                        where: {
                            AND: [{ service_id: id }, { isActive: true }],
                        },
                    });
                    service = await this.prismaService.sub_services.findMany({
                        skip: (page - 1) * limit,
                        take: limit,
                        where: {
                            AND: [{ service_id: id }, { isActive: true }],
                        },
                        orderBy: {
                            created_at: 'desc',
                        },
                        include: {
                            services: {
                                select: {
                                    Name: true,
                                },
                            },
                            timeslots: {
                                where: {
                                    isActive: true
                                }
                            },
                            cars: {
                                select: {
                                    name: true,
                                    car_model: true,
                                },
                            },
                        },
                    });
                }
                if (service.length > 0) {
                    service.forEach((obj) => {
                        obj.timeslots.forEach((slot) => {
                            slot.time = moment(slot.time)
                                .format('YYYY-MM-DD HH:mm')
                                .toString();
                        });
                    });
                }
            }
            else {
                if (searchQuery) {
                    totalRecords = await this.prismaService.sub_services.count({
                        where: {
                            AND: [
                                { name: { contains: searchQuery } },
                                { service_id: id },
                                { isActive: true },
                            ],
                        },
                    });
                    service = await this.prismaService.sub_services.findMany({
                        skip: (page - 1) * limit,
                        take: limit,
                        where: {
                            AND: [
                                { name: { contains: searchQuery } },
                                { service_id: id },
                                { isActive: true },
                            ],
                        },
                        orderBy: {
                            created_at: 'desc',
                        },
                        include: {
                            services: {
                                select: {
                                    Name: true,
                                },
                            },
                            cars: {
                                select: {
                                    name: true,
                                    car_model: true,
                                },
                            },
                        },
                    });
                }
                else {
                    totalRecords = await this.prismaService.sub_services.count({
                        where: {
                            AND: [{ service_id: id }, { isActive: true }],
                        },
                    });
                    service = await this.prismaService.sub_services.findMany({
                        skip: (page - 1) * limit,
                        take: limit,
                        where: {
                            AND: [{ service_id: id }, { isActive: true }],
                        },
                        orderBy: {
                            created_at: 'desc',
                        },
                        include: {
                            services: {
                                select: {
                                    Name: true,
                                },
                            },
                            cars: {
                                select: {
                                    name: true,
                                    car_model: true,
                                },
                            },
                        },
                    });
                }
            }
            return {
                status: service.length ? 'success' : 'failed',
                totalRecords: totalRecords,
                message: service ? 'Records found successfully!' : 'No records found!',
                data: service,
            };
        }
        catch (err) {
            console.log(err, '---->');
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        try {
            const { time_slots: timeSlots } = body, remBody = __rest(body, ["time_slots"]);
            let updateSubService;
            if (remBody) {
                console.log(remBody, 'test');
                updateSubService = await this.prismaService.sub_services.update({
                    where: {
                        id: id,
                    },
                    data: Object.assign(Object.assign({}, remBody), { updated_at: new Date().toISOString() }),
                });
            }
            if (timeSlots) {
                if (timeSlots.length) {
                    const requestedTimeSlotIds = timeSlots
                        .filter((tour) => tour.id !== null)
                        .map((tour) => tour.id);
                    const existingTimeSlots = await this.prismaService.timeslots.findMany({
                        where: {
                            sub_service_id: id,
                        },
                    });
                    const existingTimeSlotIds = existingTimeSlots.map((slot) => slot.id);
                    const deletedTimeSlotIds = existingTimeSlotIds.filter((id) => !requestedTimeSlotIds.includes(id));
                    if (deletedTimeSlotIds.length > 0) {
                        await this.prismaService.timeslots.updateMany({
                            where: {
                                id: {
                                    in: deletedTimeSlotIds,
                                },
                            },
                            data: {
                                isActive: false,
                            },
                        });
                    }
                    const updatePromises = timeSlots
                        .filter((tour) => tour.id !== null)
                        .map((slot) => {
                        return this.prismaService.timeslots.update({
                            where: {
                                id: slot.id,
                            },
                            data: {
                                time: new Date(slot.time).toISOString(),
                                updated_at: new Date().toISOString(),
                            },
                        });
                    });
                    await Promise.all(updatePromises);
                    const newTimeSlots = timeSlots.filter((tour) => tour.id === null);
                    if (newTimeSlots.length > 0) {
                        const createTimeSlotPromises = newTimeSlots.map((slot) => {
                            return this.prismaService.timeslots.create({
                                data: {
                                    sub_service_id: id,
                                    time: new Date(slot.time).toISOString(),
                                    created_at: new Date().toISOString(),
                                    updated_at: new Date().toISOString(),
                                },
                            });
                        });
                        await Promise.all(createTimeSlotPromises);
                    }
                }
            }
            return {
                status: updateSubService ? 'success' : 'failed',
                message: updateSubService
                    ? 'Records updated successfully!'
                    : 'No records updated!',
                data: {
                    tour: updateSubService,
                },
            };
        }
        catch (err) {
            console.log(err, '--->');
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: (err === null || err === void 0 ? void 0 : err.stack) || (err === null || err === void 0 ? void 0 : err.message) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        var _a, _b;
        try {
            const subService = await this.prismaService.sub_services.update({
                where: {
                    id: id,
                },
                data: {
                    isActive: false,
                },
            });
            return {
                status: subService ? 'success' : 'failed',
                message: subService
                    ? 'Records deleted successfully!'
                    : 'No records found to delete!',
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
    async getTimeslots(id) {
        var _a, _b;
        try {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const tour = await this.prismaService.timeslots.findMany({
                where: {
                    AND: [
                        { sub_service_id: id },
                        { isActive: true }
                    ]
                }
            });
            const sub_service = await this.prismaService.sub_services.findFirst({
                where: {
                    id: id
                }
            });
            const now = moment().tz(userTimezone);
            const tourTimeSlots = tour.filter((slot) => {
                const eventDate = moment.utc(slot.time).tz(userTimezone);
                if (eventDate.isAfter(now)) {
                    slot.time = moment(slot.time).utc().format('YYYY-MM-DD HH:mm');
                    return slot;
                }
            });
            return {
                status: tourTimeSlots.length ? "success" : "failed",
                message: tourTimeSlots.length
                    ? "Records found successfully!"
                    : "No records found!",
                data: {
                    timeSlots: tourTimeSlots,
                    pickup_location: sub_service.pickup_location,
                    pick_up_lat: sub_service.pickup_lat,
                    pick_up_lon: sub_service.pickup_lng
                }
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
subServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], subServicesService);
exports.subServicesService = subServicesService;
//# sourceMappingURL=sub_services.service.js.map