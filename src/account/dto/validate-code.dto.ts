import { IsNotEmpty, IsString, IsEnum, Length } from 'class-validator';

enum VerifyType {
  EMAIL = 'email',
  PHONE = 'phone',
}

export class ValidateCodeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(VerifyType)
  type: VerifyType;

  @IsNotEmpty()
  @Length(6, 6)
  @IsString()
  code: string;
}
