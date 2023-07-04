"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFuelTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fuel_type_dto_1 = require("./create-fuel-type.dto");
class UpdateFuelTypeDto extends (0, mapped_types_1.PartialType)(create_fuel_type_dto_1.CreateFuelTypeDto) {
}
exports.UpdateFuelTypeDto = UpdateFuelTypeDto;
//# sourceMappingURL=update-fuel-type.dto.js.map