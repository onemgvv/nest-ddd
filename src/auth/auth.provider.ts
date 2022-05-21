import {Provider} from "@nestjs/common";
import {AUTH_SERVICE} from "@config/constants";
import {AuthServiceImpl} from "@auth/auth.service";

export const AuthServiceProvider: Provider = {
    provide: AUTH_SERVICE,
    useClass: AuthServiceImpl
}