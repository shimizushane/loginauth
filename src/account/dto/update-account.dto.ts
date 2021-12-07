import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateAccountDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public readonly username?: string;
}
