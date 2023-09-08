import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(50)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(6)
  @Max(50)
  password: string;

  @IsString()
  @IsOptional()
  biography: string;

  @IsString()
  @IsNotEmpty()
  @Min(9)
  tel: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @Min(3)
  @Max(50)
  name: string;

  @IsString()
  @IsOptional()
  @Min(3)
  @Max(50)
  lastName: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Min(6)
  @Max(50)
  password: string;

  @IsString()
  @IsOptional()
  biography: string;

  @IsString()
  @IsOptional()
  @Min(9)
  tel: string;
}
