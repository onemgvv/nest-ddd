import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepositoryImpl} from "@persistence/app/user/user.repository";
import UserEntity from "@persistence/app/user/user.entity";
import {UserRepoProvider} from "@persistence/app/user/user.provider";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserRepositoryImpl])],
    providers: [UserRepoProvider],
    exports: [UserRepoProvider, TypeOrmModule]
})
export class UserModule {}
