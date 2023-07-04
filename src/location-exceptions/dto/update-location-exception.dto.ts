import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateLocationExceptionDto } from './create-location-exception.dto';

export class UpdateLocationExceptionDto extends PartialType(
  CreateLocationExceptionDto,
) {
  @IsOptional()
  @IsString()
  pick_up_postal_code: string;

  @IsOptional()
  @IsString()
  drop_off_postal_code: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  drop_off_loc_name: string;

  @IsOptional()
  @IsString()
  pick_up_loc_name: string;
}
