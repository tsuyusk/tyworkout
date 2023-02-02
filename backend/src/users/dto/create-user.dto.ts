import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @Length(4)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsOptional()
  @IsString()
  image?: string;
}
