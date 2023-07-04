import { IsNotEmpty, IsString } from 'class-validator';

export class CreateManufactureDto {
  @IsNotEmpty()
  @IsString()
  Manufacturer: string;
}
