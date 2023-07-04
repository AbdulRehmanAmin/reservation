import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCarPriceDto {
  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @IsNotEmpty()
  @IsNumber()
  car_price_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  monday: number;

  @IsNotEmpty()
  @IsNumber()
  tuesday: number;

  @IsNotEmpty()
  @IsNumber()
  wednesday: number;

  @IsNotEmpty()
  @IsNumber()
  thursday: number;

  @IsNotEmpty()
  @IsNumber()
  friday: number;

  @IsNotEmpty()
  @IsNumber()
  saturday: number;

  @IsNotEmpty()
  @IsNumber()
  sunday: number;

}
export class CarPriceDto {

  @IsNotEmpty()
  @IsNumber()
  monday: number;

  @IsNotEmpty()
  @IsNumber()
  tuesday: number;

  @IsNotEmpty()
  @IsNumber()
  wednesday: number;

  @IsNotEmpty()
  @IsNumber()
  thursday: number;

  @IsNotEmpty()
  @IsNumber()
  friday: number;

  @IsNotEmpty()
  @IsNumber()
  saturday: number;

  @IsNotEmpty()
  @IsNumber()
  sunday: number;

}
