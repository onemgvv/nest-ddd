import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
    }),
    ApiModule,
    AuthModule,
    DatabaseModule,
    DomainModule,
    PersistenceModule,
    UtilsModule,
  ],
})
export class AppModule {}
