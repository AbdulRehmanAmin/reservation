import { PartialType } from '@nestjs/mapped-types';
import { CreateSubServiceDto, TimeSlots } from './create-sub_service.dto';

export class UpdateSubServiceDto extends PartialType(CreateSubServiceDto) {}
