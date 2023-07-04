import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AirportDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  pickup_dropoff: boolean;

  @IsNotEmpty()
  pickup_date_time: Date;

  @IsNotEmpty()
  @IsNumber()
  num_passengers: number;

  @IsNotEmpty()
  @IsString()
  pickup_from: string;

  @IsNotEmpty()
  @IsString()
  dropoff_location: string;

  @IsString()
  airline: string;

  @IsString()
  flight_number: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  @IsNotEmpty()
  @IsString()
  pick_up_lat: string;

  @IsNotEmpty()
  @IsString()
  pick_up_lon: string;

  @IsNotEmpty()
  @IsString()
  drop_off_lat: string;

  @IsNotEmpty()
  @IsString()
  drop_off_lon: string;
}
