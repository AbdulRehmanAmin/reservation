"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAirportServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_airport_service_dto_1 = require("./create-airport_service.dto");
class UpdateAirportServiceDto extends (0, mapped_types_1.PartialType)(create_airport_service_dto_1.AirportDTO) {
}
exports.UpdateAirportServiceDto = UpdateAirportServiceDto;
//# sourceMappingURL=update-airport_service.dto.js.map