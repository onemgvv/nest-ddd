import {Provider} from "@nestjs/common";
import {TOKEN_REPOSITORY} from "@config/constants";
import {Connection, getConnectionManager} from "typeorm";
import {TokenRepositoryImpl} from "@persistence/app/token/token.repository";

export const TokenRepoProvider: Provider = {
    provide: TOKEN_REPOSITORY,
    useFactory: () => {
        const connectionManager = getConnectionManager();
        const manager: Connection = connectionManager.get('default');
        return manager.getCustomRepository(TokenRepositoryImpl);

    },
    inject: [Connection]
}