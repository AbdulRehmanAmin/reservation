"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePackageServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_package_service_dto_1 = require("./create-package_service.dto");
class UpdatePackageServiceDto extends (0, mapped_types_1.PartialType)(create_package_service_dto_1.CreatePackageServiceDto) {
}
exports.UpdatePackageServiceDto = UpdatePackageServiceDto;
//# sourceMappingURL=update-package_service.dto.js.map