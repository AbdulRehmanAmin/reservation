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
exports.AirportServicesController = void 0;
const common_1 = require("@nestjs/common");
const airport_services_service_1 = require("./airport_services.service");
const create_airport_service_dto_1 = require("./dto/create-airport_service.dto");
const update_airport_service_dto_1 = require("./dto/update-airport_service.dto");
let AirportServicesController = class AirportServicesController {
    constructor(airportServicesService) {
        this.airportServicesService = airportServicesService;
    }
    async create(body) {
        return await this.airportServicesService.create(body);
    }
    async findAll() {
        return await this.airportServicesService.findAll();
    }
    findOne(id) {
        return this.airportServicesService.findOne(+id);
    }
    update(id, body) {
        return this.airportServicesService.update(+id, body);
    }
    async remove(id) {
        return this.airportServicesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_airport_service_dto_1.AirportDTO]),
    __metadata("design:returntype", Promise)
], AirportServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getAirports'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AirportServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getAirports/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirportServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_airport_service_dto_1.UpdateAirportServiceDto]),
    __metadata("design:returntype", void 0)
], AirportServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AirportServicesController.prototype, "remove", null);
AirportServicesController = __decorate([
    (0, common_1.Controller)('airport-services'),
    __metadata("design:paramtypes", [airport_services_service_1.AirportServicesService])
], AirportServicesController);
exports.AirportServicesController = AirportServicesController;
//# sourceMappingURL=airport_services.controller.js.map