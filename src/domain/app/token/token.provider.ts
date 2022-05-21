import {Provider} from '@nestjs/common';
import {TOKEN_SERVICE} from "@config/constants";
import {TokenServiceImpl} from "@domain/app/token/token.service";

export const TokenServiceProvider: Provider = {
    provide: TOKEN_SERVICE,
    useClass: TokenServiceImpl
};