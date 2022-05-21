import {Inject, Injectable} from '@nestjs/common';
import UserModel from "@domain/app/user/user.model";
import TokenModel from "@domain/app/token/token.model";
import Tokens from "@domain/app/token/interface/tokens.interface";
import { TokenService } from "@domain/app/token/interface/service.interface";
import {JwtService} from "@nestjs/jwt";
import UserEntity from "@persistence/app/user/user.entity";
import {TOKEN_REPOSITORY} from "@config/constants";
import TokenRepository from "@persistence/app/token/interface/repository.interface";
import {classToPlain} from "class-transformer";

const TokenRepo = () => Inject(TOKEN_REPOSITORY);

@Injectable()
export class TokenServiceImpl implements TokenService {

    constructor(
        private jwtService: JwtService,
        @TokenRepo() private tokenRepository: TokenRepository
    ) {}

    /**
     *
     * Create new Access & Refresh tokens
     *
     * @param {UserModel} user
     * @return Tokens
     *
     */
    createTokens(user: UserModel): Tokens {
        const payload = Object.assign({}, user);
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.PRIVATE_KEY,
            expiresIn: '1h'
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.PRIVATE_KEY,
            expiresIn: '30d'
        });

        return { accessToken, refreshToken };
    }

    /**
     *
     * Save token to DB
     *
     * @param id
     * @param _token
     * @return Promise<TokenModel>
     *
     */
    async saveToken(id: number, _token: string): Promise<TokenModel> {
        const token = await this.tokenRepository.findOne({ where: { userId: id } });
        console.log(token);
        if(token) {
            token.refreshToken = _token;
            await token.save();
            return TokenModel.toModel(token);
        }

        return TokenModel.toModel(await this.tokenRepository.newToken(id, _token));
    }

    /**
     *
     * Validate token
     *
     * @param token
     * @return UserModel
     *
     */
    validateToken(token: string): UserModel {
        const user = this.jwtService.verify(token, {
            secret: process.env.PRIVATE_KEY,
        }) as UserEntity;
        return UserModel.toModel(user);
    }
}
