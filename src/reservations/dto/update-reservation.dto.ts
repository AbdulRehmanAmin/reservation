import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsOptional()
  @IsString()
  pick_up_loc_name: string;

  @IsOptional()
  @IsString()
  pick_up_postal_code: string;

  @IsOptional()
  @IsNumber()
  pick_up_lat: number;

  @IsOptional()
  @IsNumber()
  pick_up_lon: number;

  @IsOptional()
  @IsString()
  drop_off_loc_name: string;
}
