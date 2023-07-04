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
exports.ToursServicesController = void 0;
const common_1 = require("@nestjs/common");
const sub_services_service_1 = require("./sub_services.service");
const create_sub_service_dto_1 = require("./dto/create-sub_service.dto");
const update_sub_service_dto_1 = require("./dto/update-sub_service.dto");
let ToursServicesController = class ToursServicesController {
    constructor(subServicesService) {
        this.subServicesService = subServicesService;
    }
    create(body) {
        try {
            return this.subServicesService.createSubService(body);
        }
        catch (err) {
            throw new common_1.BadRequestException('Internal Server Error');
        }
    }
    findAll() {
        return this.subServicesService.findAll();
    }
    findOne(id, page = '1', limit = '10', searchQuery) {
        return this.subServicesService.findOne(+id, {
            limit: Number(limit),
            page: Number(page),
            searchQuery: searchQuery,
        });
    }
    update(id, updateSubServiceDto) {
        return this.subServicesService.update(+id, updateSubServiceDto);
    }
    remove(id) {
        return this.subServicesService.remove(+id);
    }
    getTimeSlots(id) {
        return this.subServicesService.getTimeslots(+id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_service_dto_1.CreateSubServiceDto]),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/get-all-sub_services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/get-sub_service/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('searchQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_service_dto_1.UpdateSubServiceDto]),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('get-time-slots/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ToursServicesController.prototype, "getTimeSlots", null);
ToursServicesController = __decorate([
    (0, common_1.Controller)('sub-services'),
    __metadata("design:paramtypes", [sub_services_service_1.subServicesService])
], ToursServicesController);
exports.ToursServicesController = ToursServicesController;
//# sourceMappingURL=sub_services.controller.js.map