import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageServiceDto } from './create-package_service.dto';

export class UpdatePackageServiceDto extends PartialType(CreatePackageServiceDto) {}
