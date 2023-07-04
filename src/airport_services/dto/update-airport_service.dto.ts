import { PartialType } from '@nestjs/mapped-types';
import { AirportDTO } from './create-airport_service.dto';

export class UpdateAirportServiceDto extends PartialType(AirportDTO) {}
