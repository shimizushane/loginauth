import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateMiddleware } from './middleware/validateRequest';
import { ShareModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import config from './config/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    UserModule,
    ShareModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('mysqlConfig') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    SessionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
