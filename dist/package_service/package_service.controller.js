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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageServiceController = void 0;
const common_1 = require("@nestjs/common");
const package_service_service_1 = require("./package_service.service");
const create_package_service_dto_1 = require("./dto/create-package_service.dto");
const update_package_service_dto_1 = require("./dto/update-package_service.dto");
let PackageServiceController = class PackageServiceController {
    constructor(packageServiceService) {
        this.packageServiceService = packageServiceService;
    }
    async create(body) {
        try {
            return await this.packageServiceService.create(body);
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = "1", limit = "5", searchQuery) {
        var _a, _b;
        try {
            return await this.packageServiceService.findAll({
                limit: Number(limit),
                page: Number(page),
                searchQuery: searchQuery
            });
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
            return await this.packageServiceService.findOne(+id);
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        var _a, _b;
        try {
            return await this.packageServiceService.update(+id, body);
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
            return await this.packageServiceService.remove(+id);
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_package_service_dto_1.CreatePackageServiceDto]),
    __metadata("design:returntype", Promise)
], PackageServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/get-all-packages"),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("searchQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PackageServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/get-package/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)("/update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_package_service_dto_1.UpdatePackageServiceDto]),
    __metadata("design:returntype", Promise)
], PackageServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageServiceController.prototype, "remove", null);
PackageServiceController = __decorate([
    (0, common_1.Controller)("package-service"),
    __metadata("design:paramtypes", [package_service_service_1.PackageServiceService])
], PackageServiceController);
exports.PackageServiceController = PackageServiceController;
//# sourceMappingURL=package_service.controller.js.map