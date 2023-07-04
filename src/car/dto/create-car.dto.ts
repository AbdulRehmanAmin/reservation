import {
  IS_OBJECT,
  IsArray,
  IsBoolean, IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { CreateSlabDto } from './create-slab.dto';
import { CreateLocExceptionDto } from './create-loc-exception.dto';
import { CarPriceDto } from "../car-prices/dto/create-car-price.dto";

export enum carType {
  Other='Other',
  Tour='Tour',
  Package='Package'
}
export class CreateCarDto {
  @IsNotEmpty()
  @IsNumber()
  body_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  transmission_id: number;

  @IsNotEmpty()
  @IsNumber()
  manufacturer_id: number;

  @IsNotEmpty()
  @IsNumber()
  driver_id: number;

  @IsNotEmpty()
  @IsNumber()
  fuel_id: number;

  @IsNotEmpty()
  @IsNumber()
  vehicle_type_id: number;

  @IsOptional()
  @IsString()
  car_model: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  qty: string;

  @IsOptional()
  @IsNumber()
  passenger_seats: number;

  @IsOptional()
  @IsNumber()
  maximum_luggage: number;

  @IsOptional()
  @IsNumber()
  total_doors: number;

  @IsOptional()
  @IsNumber()
  child_seat: number;

  @IsOptional()
  @IsString()
  pic: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  per_mile_rate: number;

  @IsNotEmpty()
  @IsNumber()
  hourly_rate: number;

  @IsNotEmpty()
  @IsNumber()
  minimum_fare: number;

  @IsOptional()
  @IsNumber()
  minimum_hours: number;

  @IsNotEmpty()
  @IsNumber()
  fixed_price: number;

  @IsNotEmpty()
  @IsBoolean()
  is_slab_enabled: boolean;

  @IsBoolean()
  @IsOptional()
  is_loc_enabled: boolean;

  @IsOptional()
  @IsArray()
  slabs: CreateSlabDto[];

  // @IsOptional()
  // @IsArray()
  // location_exceptions: CreateLocExceptionDto[];

  @IsOptional()
  @IsArray()
  features: String[];

  @IsOptional()
  @IsBoolean()
  is_car_details_enabled: boolean;

  @IsOptional()
  car_hourly_details:CarPriceDto;
  @IsOptional()
  car_per_mile_details:CarPriceDto;

  @IsOptional()
  @IsEnum(carType)
  car_type:carType
}
