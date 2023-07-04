"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHourlyServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hourly_service_dto_1 = require("./create-hourly_service.dto");
class UpdateHourlyServiceDto extends (0, mapped_types_1.PartialType)(create_hourly_service_dto_1.CreateHourlyServiceDto) {
}
exports.UpdateHourlyServiceDto = UpdateHourlyServiceDto;
//# sourceMappingURL=update-hourly_service.dto.js.map