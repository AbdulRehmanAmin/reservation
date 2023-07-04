import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  coupon_name: string;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  status : boolean;

}
