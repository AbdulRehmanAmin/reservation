import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBodyTypeDto {
  @IsNotEmpty()
  @IsString()
  body_type: string;
}
