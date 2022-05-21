import {Provider} from "@nestjs/common";
import {USER_REPOSITORY} from "@config/constants";
import {Connection, getConnectionManager} from "typeorm";
import {UserRepositoryImpl} from "@persistence/app/user/user.repository";

export const UserRepoProvider: Provider = {
    provide: USER_REPOSITORY,
    useFactory: () => {
        const connectionManager = getConnectionManager();
        const manager: Connection = connectionManager.get('default');
        return manager.getCustomRepository(UserRepositoryImpl);

    },
    inject: [Connection]
}