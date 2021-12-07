import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { VerifyPasswordMiddleware } from 'src/middleware/verifyPassword.middleware';
import { Login } from 'src/auth/entities/login.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Account, UserInfo, Login]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyPasswordMiddleware)
      .forRoutes(
        { path: 'account/delete/:id', method: RequestMethod.DELETE },
        { path: 'account/resetPassword/:id', method: RequestMethod.PATCH },
      );
  }
}
