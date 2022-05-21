import { Module } from '@nestjs/common';
import { TokenModule } from './app/token/token.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [TokenModule, UserModule],
  exports: [TokenModule, UserModule]
})
export class DomainModule {}
