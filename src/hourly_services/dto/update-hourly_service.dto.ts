import { PartialType } from '@nestjs/mapped-types';
import { CreateHourlyServiceDto } from './create-hourly_service.dto';

export class UpdateHourlyServiceDto extends PartialType(
  CreateHourlyServiceDto,
) {}
