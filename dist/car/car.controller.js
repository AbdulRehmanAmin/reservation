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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const create_car_dto_1 = require("./dto/create-car.dto");
const update_car_dto_1 = require("./dto/update-car.dto");
const create_slab_dto_1 = require("./dto/create-slab.dto");
const update_slab_dto_1 = require("./dto/update-slab.dto ");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    create(createCarDto) {
        return this.carService.create(createCarDto);
    }
    findAll() {
        return this.carService.findAll();
    }
    async getCarByType(type) {
        var _a, _b;
        try {
            return await this.carService.getCarByType(type);
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || (err === null || err === void 0 ? void 0 : err.message) || "Internal server error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        return this.carService.findOne(+id);
    }
    update(id, updateCarDto) {
        return this.carService.update(+id, updateCarDto);
    }
    remove(id) {
        return this.carService.remove(+id);
    }
    getCarByDriver(car_id, dto) {
        return this.carService.addSlab(+car_id, dto);
    }
    updateSlab(id, dto) {
        return this.carService.updateSlab(+id, dto);
    }
    deleteSlab(id) {
        return this.carService.deleteSlab(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('car-by-type'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCarByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('slab/:car_id'),
    __param(0, (0, common_1.Param)('car_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_slab_dto_1.CreateSlabDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "getCarByDriver", null);
__decorate([
    (0, common_1.Patch)('slab/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_slab_dto_1.UpdateSlabDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "updateSlab", null);
__decorate([
    (0, common_1.Delete)('slab/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "deleteSlab", null);
CarController = __decorate([
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map