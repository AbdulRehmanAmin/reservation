"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sub_service_dto_1 = require("./create-sub_service.dto");
class UpdateSubServiceDto extends (0, mapped_types_1.PartialType)(create_sub_service_dto_1.CreateSubServiceDto) {
}
exports.UpdateSubServiceDto = UpdateSubServiceDto;
//# sourceMappingURL=update-sub_service.dto.js.map