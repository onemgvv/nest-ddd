import UserModel from "@domain/app/user/user.model";
import Tokens from "../interface/tokens.interface";
import TokenModel from "@domain/app/token/token.model";

export interface TokenService {
    /**
     *
     * Validate token
     *
     * @param token
     * @return Promise<UserModel>
     *
     */
    validateToken(token: string): UserModel;

    /**
     *
     * Create new Access & Refresh tokens
     *
     * @param {UserModel} user
     * @return Promise<Tokens>
     *
     */
    createTokens(user: UserModel): Tokens;

    /**
     *
     * Save token to DB
     *
     * @param {number} id
     * @param {string} token
     * @return Promise<TokenModel>
     *
     */
    saveToken(id: number, token: string): Promise<TokenModel>;
}