import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
