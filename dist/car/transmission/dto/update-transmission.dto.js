"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransmissionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transmission_dto_1 = require("./create-transmission.dto");
class UpdateTransmissionDto extends (0, mapped_types_1.PartialType)(create_transmission_dto_1.CreateTransmissionDto) {
}
exports.UpdateTransmissionDto = UpdateTransmissionDto;
//# sourceMappingURL=update-transmission.dto.js.map