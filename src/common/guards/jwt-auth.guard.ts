import {
    ACCESS_TOKEN_IS_NOT_SET,
    REFRESH_TOKEN_IS_NOT_SET,
    TOKEN_SERVICE, USER_SERVICE,
} from '@config/constants';
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
    REFRESH_TOKEN_IS_NOT_VALID,
} from '@config/constants';
import {
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { TokenService } from '@domain/app/token/interface/service.interface';
import UserService from "@domain/app/user/interface/service.interface";

const TokenService = () => Inject(TOKEN_SERVICE);
const UserService = () => Inject(USER_SERVICE);

export const cookieExtractor = (req: Request): string | null => {
    if (req && req.cookies) {
        return req.cookies[ACCESS_TOKEN_NAME];
    }

    return null;
};

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
    private logger = new Logger(CustomAuthGuard.name);

    constructor(
        @TokenService() private tokenService: TokenService,
        @UserService() private userService: UserService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        try {
            const accessToken = ExtractJwt.fromExtractors([cookieExtractor])(request);
            if (!accessToken)
                throw new UnauthorizedException(ACCESS_TOKEN_IS_NOT_SET);

            const isValidAccessToken = await this.tokenService.validateToken(
                accessToken,
            );

            if (isValidAccessToken) return this.activate(context);

            const refreshToken = request.cookies[REFRESH_TOKEN_NAME];
            if (!refreshToken) {
                throw new UnauthorizedException(REFRESH_TOKEN_IS_NOT_SET);
            }

            const isValidRefreshToken = await this.tokenService.validateToken(
                refreshToken,
            );

            if (!isValidRefreshToken) {
                throw new UnauthorizedException(REFRESH_TOKEN_IS_NOT_VALID);
            }

            const user = await this.userService.getByToken(refreshToken);
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
                await this.tokenService.createTokens(user);

            await this.tokenService.saveToken(user.getId(), newRefreshToken);

            request.cookies[ACCESS_TOKEN_NAME] = newAccessToken;
            request.cookies[REFRESH_TOKEN_NAME] = newRefreshToken;

            response.cookie(ACCESS_TOKEN_NAME, newAccessToken);
            response.cookie(REFRESH_TOKEN_NAME, newRefreshToken);

            request.user = user;
            return this.activate(context);
        } catch (err) {
            this.logger.error(err);
            response.clearCookie(ACCESS_TOKEN_NAME);
            response.clearCookie(REFRESH_TOKEN_NAME);
            return false;
        }
    }

    async activate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}