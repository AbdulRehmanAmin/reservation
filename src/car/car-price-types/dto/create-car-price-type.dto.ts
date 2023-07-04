import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarPriceTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
