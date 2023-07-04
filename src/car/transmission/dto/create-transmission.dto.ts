import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransmissionDto {
  @IsNotEmpty()
  @IsString()
  transmission: string;
}
