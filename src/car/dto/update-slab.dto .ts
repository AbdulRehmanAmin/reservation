import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateSlabDto } from './create-slab.dto';

export class UpdateSlabDto extends PartialType(CreateSlabDto) {
  @IsOptional()
  @IsNumber()
  initial_distance: number;

  @IsOptional()
  @IsNumber()
  final_distance: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
