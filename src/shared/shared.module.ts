import { Module } from '@nestjs/common';
import { AccountDtoValidationPipe } from 'src/pipes/accountDtoValidation.pipe';

@Module({
  providers: [AccountDtoValidationPipe],
})
export class ShareModule {}
