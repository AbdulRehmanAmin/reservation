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
exports.LocationExceptionsController = void 0;
const common_1 = require("@nestjs/common");
const location_exceptions_service_1 = require("./location-exceptions.service");
const create_location_exception_dto_1 = require("./dto/create-location-exception.dto");
const update_location_exception_dto_1 = require("./dto/update-location-exception.dto");
const platform_express_1 = require("@nestjs/platform-express");
let LocationExceptionsController = class LocationExceptionsController {
    constructor(locationExceptionsService) {
        this.locationExceptionsService = locationExceptionsService;
    }
    create(createLocationExceptionDto) {
        return this.locationExceptionsService.create(createLocationExceptionDto);
    }
    async uploadCsv(file) {
        try {
            const result = await this.locationExceptionsService.processCsv(file.path);
            return {
                status: 'successfully Created',
            };
        }
        catch (error) {
            return {
                status: 'fail',
                message: error.message,
                data: error.data,
            };
        }
    }
    findAll() {
        return this.locationExceptionsService.findAll();
    }
    findOne(id) {
        return this.locationExceptionsService.findOne(+id);
    }
    update(id, updateLocationExceptionDto) {
        return this.locationExceptionsService.update(+id, updateLocationExceptionDto);
    }
    remove(id) {
        return this.locationExceptionsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_exception_dto_1.CreateLocationExceptionDto]),
    __metadata("design:returntype", void 0)
], LocationExceptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationExceptionsController.prototype, "uploadCsv", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationExceptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationExceptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_exception_dto_1.UpdateLocationExceptionDto]),
    __metadata("design:returntype", void 0)
], LocationExceptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationExceptionsController.prototype, "remove", null);
LocationExceptionsController = __decorate([
    (0, common_1.Controller)('location-exceptions'),
    __metadata("design:paramtypes", [location_exceptions_service_1.LocationExceptionsService])
], LocationExceptionsController);
exports.LocationExceptionsController = LocationExceptionsController;
//# sourceMappingURL=location-exceptions.controller.js.map