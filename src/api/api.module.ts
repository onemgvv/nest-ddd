import { Module } from '@nestjs/common';
import { UserController } from './app/user/user.controller';
import { AuthController } from './auth/auth.controller';
import {DomainModule} from "@domain/domain.module";
import {AuthModule} from "@auth/auth.module";

@Module({
  imports: [AuthModule, DomainModule],
  controllers: [UserController, AuthController]
})
export class ApiModule {}
