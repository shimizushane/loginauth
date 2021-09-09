import { Module } from '@nestjs/common';
import { UserDtoValidationPipe } from 'src/pipes/userDtoValidation.pipe';

@Module({
  providers: [UserDtoValidationPipe],
})
export class ShareModule {}
