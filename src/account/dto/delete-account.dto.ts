import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
