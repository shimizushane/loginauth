import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShareModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
// import { AuthModule } from './auth/auth.module';
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
export class AppModule {}
