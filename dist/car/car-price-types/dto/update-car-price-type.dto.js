"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarPriceTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_car_price_type_dto_1 = require("./create-car-price-type.dto");
class UpdateCarPriceTypeDto extends (0, mapped_types_1.PartialType)(create_car_price_type_dto_1.CreateCarPriceTypeDto) {
}
exports.UpdateCarPriceTypeDto = UpdateCarPriceTypeDto;
//# sourceMappingURL=update-car-price-type.dto.js.map