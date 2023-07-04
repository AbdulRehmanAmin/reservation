import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocExceptionDto {
  @IsNotEmpty()
  @IsNumber()
  pick_up_postal_code: number;

  @IsNotEmpty()
  @IsNumber()
  drop_off_postal_code: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
