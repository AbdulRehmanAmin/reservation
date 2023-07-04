"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarPriceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_car_price_dto_1 = require("./create-car-price.dto");
class UpdateCarPriceDto extends (0, mapped_types_1.PartialType)(create_car_price_dto_1.CreateCarPriceDto) {
}
exports.UpdateCarPriceDto = UpdateCarPriceDto;
//# sourceMappingURL=update-car-price.dto.js.map