import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  long: number;

  @IsNotEmpty()
  @IsNumber()
  locality: number;
}

export class CalculatePriceDTO {
  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  pick_up: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  drop_off: LocationDto;
}
