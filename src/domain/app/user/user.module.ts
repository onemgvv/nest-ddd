import { Module } from '@nestjs/common';
import { UserModule as UserRepoModule } from '@persistence/app/user/user.module';
import { UserServiceProvider } from './user.provider';


@Module({
    imports: [UserRepoModule],
    providers: [UserServiceProvider],
    exports: [UserServiceProvider]
})
export class UserModule {}
