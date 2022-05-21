import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {TokenEntity} from "@persistence/app/token/token.entity";
import TokenRepository from "@persistence/app/token/interface/repository.interface";

@Injectable()
@EntityRepository(TokenEntity)
export class TokenRepositoryImpl extends Repository<TokenEntity> implements TokenRepository {

    /**
     *
     * Save new token in database
     *
     * @param userId
     * @param _token
     * @return Promise<TokenEntity>
     *
     */
    async newToken(userId: number, _token: string): Promise<TokenEntity> {
        return this.save({ userId, refreshToken: _token });
    }

    /**
     *
     * find token by userId
     *
     * @param userId
     * @return Promise<TokenEntity>
     *
     */
    findByUserId(userId: number): Promise<TokenEntity> {
        return this.findOne({ where: { userId } });
    }

    /**
     *
     * Delete one token from database
     *
     * @param token
     * @return boolean
     *
     */
    deleteOne(token: TokenEntity): boolean {
        return !!this.remove(token);
    }

}