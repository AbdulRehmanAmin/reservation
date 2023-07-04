import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  pic: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  dob: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  postal: string;

  @IsOptional()
  @IsString()
  permissions: string;

  @IsOptional()
  @IsBoolean()
  status: Boolean;
}
