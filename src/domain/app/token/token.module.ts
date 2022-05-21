import { Module } from '@nestjs/common';
import {TokenServiceProvider} from "@domain/app/token/token.provider";
import {UserModule} from "@persistence/app/user/user.module";
import { TokenModule as TokenRepoModule } from '@persistence/app/token/token.module';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.PRIVATE_KEY,
        signOptions: { expiresIn: '24h' },
      }),
      TokenRepoModule,
      UserModule
  ],
  providers: [TokenServiceProvider],
  exports: [TokenServiceProvider]
})
export class TokenModule {}
