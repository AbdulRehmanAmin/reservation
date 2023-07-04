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
exports.PointToPointController = void 0;
const common_1 = require("@nestjs/common");
const point_to_point_service_1 = require("./point-to-point.service");
const create_point_to_point_dto_1 = require("./dto/create-point-to-point.dto");
const update_point_to_point_dto_1 = require("./dto/update-point-to-point.dto");
let PointToPointController = class PointToPointController {
    constructor(pointToPointService) {
        this.pointToPointService = pointToPointService;
    }
    create(createPointToPointDto) {
        return this.pointToPointService.create(createPointToPointDto);
    }
    findAll() {
        return this.pointToPointService.findAll();
    }
    findOne(id) {
        return this.pointToPointService.findOne(+id);
    }
    update(id, updatePointToPointDto) {
        return this.pointToPointService.update(+id, updatePointToPointDto);
    }
    remove(id) {
        return this.pointToPointService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_point_to_point_dto_1.CreatePointToPointDto]),
    __metadata("design:returntype", void 0)
], PointToPointController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PointToPointController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointToPointController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_point_to_point_dto_1.UpdatePointToPointDto]),
    __metadata("design:returntype", void 0)
], PointToPointController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointToPointController.prototype, "remove", null);
PointToPointController = __decorate([
    (0, common_1.Controller)('point-to-point'),
    __metadata("design:paramtypes", [point_to_point_service_1.PointToPointService])
], PointToPointController);
exports.PointToPointController = PointToPointController;
//# sourceMappingURL=point-to-point.controller.js.map