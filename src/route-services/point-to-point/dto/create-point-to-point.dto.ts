import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePointToPointDto {
  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  pickup_location: string;

  @IsNotEmpty()
  pickup_date_time: Date;

  @IsNotEmpty()
  @IsNumber()
  num_passengers: number;

  @IsNotEmpty()
  @IsString()
  dropoff_location: string;

  @IsNotEmpty()
  @IsBoolean()
  add_another_stop: boolean;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

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

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  additional_comments: string;
}
