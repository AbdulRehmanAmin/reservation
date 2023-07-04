import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateHourlyServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  pickup_location: string;

  @IsOptional()
  @IsNotEmpty()
  pickup_date_time: Date;

  @IsNotEmpty()
  @IsNumber()
  num_passengers: number;

  @IsNotEmpty()
  @IsNumber()
  num_service_hours: number;

  @IsNotEmpty()
  @IsString()
  dropoff_location: string;

  @IsNotEmpty()
  @IsBoolean()
  add_another_stop: boolean;

  @IsOptional()
  @IsString()
  additional_comments: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  service_id: number;
}
