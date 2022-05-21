import { Provider } from '@nestjs/common';
import { USER_SERVICE } from "@config/constants";
import { UserServiceImpl } from "@domain/app/user/user.service";

export const UserServiceProvider: Provider = {
    provide: USER_SERVICE,
    useClass: UserServiceImpl
};