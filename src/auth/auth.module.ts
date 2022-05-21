import { Module } from '@nestjs/common';
import {TokenModule} from "@domain/app/token/token.module";
import {UserModule} from "@domain/app/user/user.module";
import {AuthServiceProvider} from "@auth/auth.provider";
import {JWTStrategy} from "@auth/strategy/jwt.strategy";

@Module({
  imports: [TokenModule, UserModule],
  providers: [JWTStrategy, AuthServiceProvider],
  exports: [AuthServiceProvider]
})
export class AuthModule {}
