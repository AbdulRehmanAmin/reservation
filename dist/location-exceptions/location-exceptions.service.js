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
exports.LocationExceptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const fs_1 = require("fs");
const csvParser = require("csv-parser");
let LocationExceptionsService = class LocationExceptionsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createLocationExceptionDto) {
        var _a, _b;
        try {
            const newLocationException = await this.prismaService.location_exceptions.create({
                data: Object.assign({}, createLocationExceptionDto)
            });
            return {
                status: newLocationException ? "success" : "failed",
                message: newLocationException
                    ? "Record created successfully!"
                    : "No record created!",
                data: newLocationException
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async processCsv(filePath) {
        return new Promise((resolve, reject) => {
            let errorRecords = [];
            const stream = (0, fs_1.createReadStream)(filePath);
            stream
                .pipe(csvParser({ separator: "," }))
                .on("data", async (row) => {
                const pick_up_postal_code = row["pick_up_postal_code"];
                const drop_off_postal_code = row["drop_off_postal_code"];
                const price = parseFloat(row.price);
                if (!pick_up_postal_code || !drop_off_postal_code || isNaN(price)) {
                    errorRecords.push(row);
                    return;
                }
                const body = {
                    pick_up_postal_code,
                    drop_off_postal_code,
                    price: price,
                    pick_up_loc_name: null,
                    drop_off_loc_name: null
                };
                await this.create(body);
            })
                .on("end", () => {
                if (errorRecords.length > 0) {
                    console.log('Error in Csv upload');
                    reject({
                        status: 'fail',
                        message: 'Some records were not created due to missing or invalid values.',
                        data: errorRecords,
                    });
                }
                else {
                    resolve({
                        status: 'success',
                        message: 'Records created successfully!',
                        data: null,
                    });
                }
            })
                .on("error", () => {
                console.log('Error in Csv upload');
                reject({
                    status: 'fail',
                    message: 'Records not created!',
                    data: null,
                });
            });
        });
    }
    async findAll() {
        var _a, _b;
        try {
            const allLocationExceptions = await this.prismaService.location_exceptions.findMany();
            return {
                status: allLocationExceptions.length > 0 ? "success" : "failed",
                message: allLocationExceptions.length > 0
                    ? "Records found successfully!"
                    : "No records found!",
                data: allLocationExceptions
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
            const singleLocExcp = await this.prismaService.manufacturers.findUnique({
                where: {
                    id
                }
            });
            return {
                status: singleLocExcp ? "success" : "failed",
                message: singleLocExcp
                    ? "Record found successfully!"
                    : "No record found!",
                data: singleLocExcp || {}
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateLocationExceptionDto) {
        var _a, _b;
        try {
            const singleLocExcp = await this.prismaService.location_exceptions.findUnique({
                where: {
                    id
                }
            });
            const updateLocationException = await this.prismaService.location_exceptions.update({
                where: {
                    id
                },
                data: {
                    pick_up_postal_code: updateLocationExceptionDto.pick_up_postal_code ||
                        singleLocExcp.pick_up_postal_code,
                    drop_off_postal_code: updateLocationExceptionDto.drop_off_postal_code ||
                        singleLocExcp.drop_off_postal_code,
                    pick_up_loc_name: updateLocationExceptionDto.pick_up_loc_name ||
                        singleLocExcp.pick_up_loc_name,
                    drop_off_loc_name: updateLocationExceptionDto.drop_off_loc_name ||
                        singleLocExcp.drop_off_loc_name,
                    price: updateLocationExceptionDto.price || singleLocExcp.price
                }
            });
            return {
                status: updateLocationException ? "success" : "failed",
                message: updateLocationException
                    ? "Record updated successfully!"
                    : "No record updated!",
                data: updateLocationException
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
    async remove(id) {
        var _a, _b;
        try {
            const deleteLocationException = await this.prismaService.location_exceptions.delete({
                where: {
                    id
                }
            });
            return {
                status: "success",
                message: "Record deleted successfully!",
                data: deleteLocationException
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
LocationExceptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationExceptionsService);
exports.LocationExceptionsService = LocationExceptionsService;
//# sourceMappingURL=location-exceptions.service.js.map