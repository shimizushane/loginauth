import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

enum VerifyType {
  EMAIL = 'email',
  PHONE = 'phone',
}

export class VerificationCodeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(VerifyType)
  type: VerifyType;

  @IsOptional()
  @IsString()
  value: string;
}
