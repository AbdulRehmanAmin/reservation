import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFuelTypeDto {
  @IsNotEmpty()
  @IsString()
  fuel_type: string;
}
