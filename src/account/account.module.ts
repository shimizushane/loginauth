import { Module, CacheModule } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { UserInfo } from 'src/user-info/entities/user-info.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Account, UserInfo]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
