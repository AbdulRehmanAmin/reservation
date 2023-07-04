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
exports.VehicleTypesController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_types_service_1 = require("./vehicle-types.service");
const create_vehicle_type_dto_1 = require("./dto/create-vehicle-type.dto");
const update_vehicle_type_dto_1 = require("./dto/update-vehicle-type.dto");
let VehicleTypesController = class VehicleTypesController {
    constructor(vehicleTypesService) {
        this.vehicleTypesService = vehicleTypesService;
    }
    create(createVehicleTypeDto) {
        return this.vehicleTypesService.create(createVehicleTypeDto);
    }
    findAll() {
        return this.vehicleTypesService.findAll();
    }
    findOne(id) {
        return this.vehicleTypesService.findOne(+id);
    }
    update(id, updateVehicleTypeDto) {
        return this.vehicleTypesService.update(+id, updateVehicleTypeDto);
    }
    remove(id) {
        return this.vehicleTypesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_type_dto_1.CreateVehicleTypeDto]),
    __metadata("design:returntype", void 0)
], VehicleTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_type_dto_1.UpdateVehicleTypeDto]),
    __metadata("design:returntype", void 0)
], VehicleTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleTypesController.prototype, "remove", null);
VehicleTypesController = __decorate([
    (0, common_1.Controller)('vehicle-types'),
    __metadata("design:paramtypes", [vehicle_types_service_1.VehicleTypesService])
], VehicleTypesController);
exports.VehicleTypesController = VehicleTypesController;
//# sourceMappingURL=vehicle-types.controller.js.map