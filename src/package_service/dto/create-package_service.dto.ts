import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePackageServiceDto {
  @IsString()
  name:string

  @IsString()
  @IsOptional()
  description :string

  @IsOptional()
  @IsString()
  pickup_location :string

  @IsOptional()
  @IsNumber()
  pickup_lat: number

  @IsOptional()
  @IsNumber()
  pickup_lng: number

  @IsOptional()
  @IsString()
  dropoff_location :string

  @IsOptional()
  @IsNumber()
  dropoff_lat :number

  @IsOptional()
  @IsNumber()
  dropoff_lng :number

  @IsNumber()
  price:number

  @IsNumber()
  passenger_capacity:number

  @IsOptional()
  @IsNumber()
  luggage:number

  @IsDate()
  @IsOptional()
  created_at:Date

  @IsDate()
  @IsOptional()
  updated_at:Date

  @IsNumber()
  car_id:number
}
