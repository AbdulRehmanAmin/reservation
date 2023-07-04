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
exports.CarPriceTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let CarPriceTypesService = class CarPriceTypesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCarPriceTypeDto) {
        const response = await this.prismaService.car_price_types.create({
            data: {
                name: createCarPriceTypeDto.name,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        });
        return {
            status: 'success',
            message: 'Car price type created successfully!',
            data: response,
        };
    }
    async findAll() {
        const carPriceTypes = await this.prismaService.car_price_types.findMany();
        return {
            status: 'success',
            message: carPriceTypes.length > 0
                ? 'Records found successfully!'
                : 'No records found!',
            data: carPriceTypes.length > 0 ? carPriceTypes : [],
        };
    }
    async findOne(id) {
        const carPriceType = await this.prismaService.car_price_types.findUnique({
            where: {
                id: id,
            },
        });
        return {
            status: 'success',
            message: 'Record found successfully!',
            data: carPriceType,
        };
    }
    async update(id, updateCarPriceTypeDto) {
        const response = await this.prismaService.car_price_types.update({
            where: {
                id: id,
            },
            data: {
                name: updateCarPriceTypeDto.name,
                updated_at: new Date().toISOString(),
            },
        });
        return {
            status: 'success',
            message: 'Car price type updated successfully!',
            data: response,
        };
    }
    async remove(id) {
        const response = await this.prismaService.car_price_types.delete({
            where: {
                id: id,
            },
        });
        return {
            status: 'success',
            message: 'Car price type deleted successfully!',
            data: response,
        };
    }
};
CarPriceTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarPriceTypesService);
exports.CarPriceTypesService = CarPriceTypesService;
//# sourceMappingURL=car-price-types.service.js.map