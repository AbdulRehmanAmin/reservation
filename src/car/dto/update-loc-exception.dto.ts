import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateLocExceptionDto } from './create-loc-exception.dto';

export class UpdateLocExceptionDto extends PartialType(CreateLocExceptionDto) {
  @IsOptional()
  @IsNumber()
  pick_up_postal_code: number;

  @IsOptional()
  @IsNumber()
  drop_off_postal_code: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
