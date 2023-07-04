"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManufactureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_manufacture_dto_1 = require("./create-manufacture.dto");
class UpdateManufactureDto extends (0, mapped_types_1.PartialType)(create_manufacture_dto_1.CreateManufactureDto) {
}
exports.UpdateManufactureDto = UpdateManufactureDto;
//# sourceMappingURL=update-manufacture.dto.js.map