import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationExceptionDto {
  @IsOptional()
  @IsString()
  pick_up_loc_name: string;

  @IsNotEmpty()
  @IsString()
  pick_up_postal_code: string;

  @IsOptional()
  @IsString()
  drop_off_loc_name: string;


  @IsNotEmpty()
  @IsString()
  drop_off_postal_code: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
