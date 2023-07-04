"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBodyTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_body_type_dto_1 = require("./create-body-type.dto");
class UpdateBodyTypeDto extends (0, mapped_types_1.PartialType)(create_body_type_dto_1.CreateBodyTypeDto) {
}
exports.UpdateBodyTypeDto = UpdateBodyTypeDto;
//# sourceMappingURL=update-body-type.dto.js.map