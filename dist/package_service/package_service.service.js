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
exports.PackageServiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PackageServiceService = class PackageServiceService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(body) {
        var _a, _b;
        try {
            const packages = await this.prismaService.package_serivce.create({
                data: Object.assign(Object.assign({}, body), { created_at: new Date().toISOString() })
            });
            return {
                status: packages ? "success" : "failed",
                message: packages ? "Record created successfully!" : "No record created!",
                data: packages
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(param) {
        var _a, _b;
        try {
            let { limit, page, searchQuery } = param;
            let where = {}, totalRecords = 0, packages;
            if (searchQuery) {
                where = {
                    AND: [
                        { name: { contains: searchQuery } },
                        { isActive: true }
                    ]
                };
                totalRecords = await this.prismaService.package_serivce.count({ where });
                packages = await this.prismaService.package_serivce.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    where,
                    orderBy: {
                        created_at: "desc"
                    },
                    include: {
                        cars: {
                            select: {
                                name: true
                            }
                        }
                    }
                });
            }
            else if (limit === 0) {
                totalRecords = await this.prismaService.package_serivce.count({
                    where: {
                        isActive: true
                    }
                });
                packages = await this.prismaService.package_serivce.findMany({
                    where: {
                        isActive: true
                    },
                    orderBy: {
                        created_at: "desc"
                    },
                    include: {
                        cars: {
                            select: {
                                name: true
                            }
                        }
                    }
                });
            }
            else {
                totalRecords = await this.prismaService.package_serivce.count({
                    where: {
                        isActive: true
                    }
                });
                packages = await this.prismaService.package_serivce.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {
                        isActive: true
                    },
                    orderBy: {
                        created_at: "desc"
                    },
                    include: {
                        cars: {
                            select: {
                                name: true
                            }
                        }
                    }
                });
            }
            return {
                status: packages.length ? "success" : "failed",
                message: packages.length
                    ? "Records found successfully!"
                    : "No records found!",
                data: packages,
                totalRecords
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
            const packageServiceResponse = await this.prismaService.package_serivce.findFirst({
                where: {
                    id: id
                },
                include: {
                    cars: {
                        select: {
                            name: true,
                            image: true,
                            passenger_seats: true,
                            id: true
                        }
                    }
                }
            });
            return {
                status: "success",
                message: packageServiceResponse
                    ? "Records found successfully!"
                    : "No records found!",
                data: packageServiceResponse
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updatePackageServiceDto) {
        var _a, _b;
        try {
            const updatePackageService = await this.prismaService.package_serivce.update({
                where: {
                    id: id
                },
                data: Object.assign({ updated_at: new Date().toISOString() }, updatePackageServiceDto)
            });
            return {
                status: updatePackageService ? "success" : "failed",
                message: updatePackageService ? "Record Updated successfully!" : "No Record Updated!",
                data: updatePackageService !== null && updatePackageService !== void 0 ? updatePackageService : []
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
            const removePackageService = await this.prismaService.package_serivce.update({
                where: {
                    id: id
                },
                data: {
                    isActive: false,
                    updated_at: new Date().toISOString()
                }
            });
            return {
                status: removePackageService ? "success" : "failed",
                message: removePackageService ? "Record Deleted successfully!" : "Something Went Wrong",
                data: []
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
PackageServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PackageServiceService);
exports.PackageServiceService = PackageServiceService;
//# sourceMappingURL=package_service.service.js.map