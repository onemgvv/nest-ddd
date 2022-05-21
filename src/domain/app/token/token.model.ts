import {TokenEntity} from "@persistence/app/token/token.entity";

export default class TokenModel {
    private _id: number;
    private _token: string;

    get id() { return this._id; }
    set id(value: number) { this._id = value; }

    get token() { return this._token; }
    set token(value: string) { this._token = value; }

    static toModel(token: TokenEntity) {
        const model = new TokenModel();
        model.id = token.id;
        model.token = token.refreshToken;
        return model;
    }
}