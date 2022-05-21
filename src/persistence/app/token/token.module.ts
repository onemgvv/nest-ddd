import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenRepositoryImpl} from "@persistence/app/token/token.repository";
import {TokenEntity} from "@persistence/app/token/token.entity";
import {TokenRepoProvider} from "@persistence/app/token/token.provider";

@Module({
    imports: [TypeOrmModule.forFeature([TokenEntity, TokenRepositoryImpl])],
    providers: [TokenRepoProvider],
    exports: [TokenRepoProvider, TypeOrmModule],
})
export class TokenModule {}
