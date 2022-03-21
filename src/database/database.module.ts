import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDbConfigAsync } from '@config/database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(postgresDbConfigAsync)],
})
export class DatabaseModule {}
