import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminReservationDto {
  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  @IsOptional()
  @IsString()
  order_number: string;

  @IsNotEmpty()
  @IsString()
  pick_up_loc_name: string;

  @IsOptional()
  @IsString()
  drop_off_loc_name: string;

  @IsOptional()
  pick_up_date: Date;

  @IsOptional()
  @IsString()
  flight_no: string;

  @IsOptional()
  @IsString()
  airline: string;

  @IsOptional()
  @IsNumber()
  maximum_passenger: number;

  @IsOptional()
  @IsNumber()
  maximum_luggage: number;

  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @IsOptional()
  @IsNumber()
  tax: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  coupon: string;

  @IsOptional()
  @IsString()
  payment_status: string;

  @IsOptional()
  @IsString()
  special_instruction: string;
}
