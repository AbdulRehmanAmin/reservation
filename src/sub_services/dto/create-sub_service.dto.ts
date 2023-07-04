import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateSubServiceDto {
  @IsNumber()
  @IsOptional()
  service_id: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  time: string[];

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  pickup_location: string;

  @IsOptional()
  @IsNumber()
  pickup_lat: number;

  @IsOptional()
  @IsNumber()
  pickup_lng: number;

  @IsOptional()
  @IsString()
  dropoff_location: string;

  @IsOptional()
  @IsNumber()
  dropoff_lat: number;

  @IsOptional()
  @IsNumber()
  dropoff_lng: number;

  @IsNumber()
  price_per_passenger: number;

  @IsOptional()
  @IsNumber()
  luggage: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at: Date;
  @IsOptional()
  @IsNumber()
  passenger_capacity: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  car_id: number;

  @IsOptional()
  time_slots: [TimeSlots];
}

export class TimeSlots {

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  sub_service_id: number;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at: Date;
}