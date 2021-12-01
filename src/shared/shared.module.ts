import { Module } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Module({
  providers: [ValidationPipe],
})
export class ShareModule {}
