import {TokenEntity} from "@persistence/app/token/token.entity";

export default class TokenModel {
    private id: number;
    private token: string;

    getId() { return this.id; }
    setId(value: number) { this.id = value; }

    getToken() { return this.token; }
    setToken(value: string) { this.token = value; }

    static toModel(token: TokenEntity) {
        const model = new TokenModel();
        model.setId(token.id);
        model.setToken(token.refreshToken);
        return model;
    }
}