"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePointToPointDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_point_to_point_dto_1 = require("./create-point-to-point.dto");
class UpdatePointToPointDto extends (0, mapped_types_1.PartialType)(create_point_to_point_dto_1.CreatePointToPointDto) {
}
exports.UpdatePointToPointDto = UpdatePointToPointDto;
//# sourceMappingURL=update-point-to-point.dto.js.map