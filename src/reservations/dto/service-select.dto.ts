import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";

export class ServiceSelectDto {
  @IsNotEmpty()
  @IsNumber()
  sub_service_id: number;

  @IsOptional()
  pick_up_date: Date;

  // @IsNotEmpty()
  // @IsString()
  // pick_up_loc: string;

  @IsNotEmpty()
  @IsString()
  pick_up_postal_code: string;


  @IsNotEmpty()
  @IsNumber()
  pick_up_lat: number;

  @IsNotEmpty()
  @IsNumber()
  pick_up_long: number;


  @IsNotEmpty()
  @IsNumber()
  maximum_passenger: number;

  @IsOptional()
  @IsNumber()
  maximum_luggage: number;


  ////////////////////////////////////////////////////////////////
  ///////////////        Optional fields        //////////////////
  ////////////////////////////////////////////////////////////////


  // @IsOptional()
  // @IsString()
  // drop_off_loc: string;


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
  @IsString()
  airline: string;

  @IsOptional()
  @IsString()
  flight_no: string;

  @IsOptional()
  @IsNumber()
  no_of_hours: number;

//   --------- Tour & Package Service -------------------

  @IsOptional()
  @IsNumber()
  tour_id:number

  @IsOptional()
  @IsNumber()
  time:number



}
