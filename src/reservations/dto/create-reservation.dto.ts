import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  sub_service_id: number;

 @IsOptional()
  @IsNumber()
  car_id: number;

  @IsOptional()
  @IsString()
  pick_up_loc_name: string;

  @IsOptional()
  @IsString()
  pick_up_postal_code: string;

  @IsOptional()
  @IsNumber()
  pick_up_lat: number;

  @IsOptional()
  @IsNumber()
  pick_up_long: number;

  @IsOptional()
  @IsString()
  drop_off_loc_name: string;

  @IsOptional()
  @IsString()
  drop_off_postal_code: string;

  @IsOptional()
  @IsNumber()
  drop_off_lat: number;

  @IsOptional()
  @IsNumber()
  drop_off_long: number;

  @IsOptional()
  pick_up_date: Date;

  @IsOptional()
  @IsString()
  airline: string;

  @IsOptional()
  @IsString()
  flight_no: string;

  @IsOptional()
  @IsNumber()
  no_of_hours: number;

  @IsOptional()
  @IsString()
  customer_first_name: string;

  @IsOptional()
  @IsString()
  customer_last_name: string;

  @IsOptional()
  @IsString()
  customer_cnic: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  customer_email: string;

  @IsOptional()
  @IsString()
  customer_phone: string;

  @IsOptional()
  @IsNumber()
  maximum_passenger: number;

  @IsOptional()
  @IsNumber()
  maximum_luggage: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  tax: number;

@IsOptional()
@IsString()
 special_request:string
}
