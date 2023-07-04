import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {

  @IsString()
  nonce:string

  @IsNumber()
  amount:number

  @IsString()
  id:string

  // @IsString()
  // order_number:string

  // @IsNumber()
  // total_amount:number

  // @IsEmail()
  // buyer_email:string
}
