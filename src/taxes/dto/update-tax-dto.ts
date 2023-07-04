import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxDto } from './create-tax-dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaxDto extends PartialType(CreateTaxDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  percentage: number;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsNumber()
  service_id: number;
}
