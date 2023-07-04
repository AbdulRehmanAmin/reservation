import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSlabDto {
  @IsNotEmpty()
  @IsNumber()
  initial_distance: number;

  @IsNotEmpty()
  @IsNumber()
  final_distance: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
