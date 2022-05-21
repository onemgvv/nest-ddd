import {TokenEntity} from "@persistence/app/token/token.entity";
import {Repository} from "typeorm";

export default interface TokenRepository extends Repository<TokenEntity> {
    /**
     *
     * Save new token in database
     *
     * @param userId
     * @param _token
     * @return Promise<TokenEntity>
     *
     */
    newToken(userId: number, _token: string): Promise<TokenEntity>;

    /**
     *
     * find token by userId
     *
     * @param userId
     * @return Promise<TokenEntity>
     *
     */
    findByUserId(userId: number): Promise<TokenEntity>;

    /**
     *
     * Delete one token from database
     *
     * @param token
     * @return boolean
     *
     */
    deleteOne(token: TokenEntity): boolean;
}