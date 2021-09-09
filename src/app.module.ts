import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validateMiddleware } from './middleware/validateRequest';
import { ShareModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ShareModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
