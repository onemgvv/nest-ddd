import {Body, Controller, HttpCode, Inject, Post, Res, UseInterceptors, UsePipes} from '@nestjs/common';
import {
    AUTH_SERVICE, AUTHORIZATION_EXCEPTION,
    SUCCESSFUL_AUTHORIZATION,
    SUCCESSFUL_REGISTER,
    USER_ALREADY_EXISTS,
    USER_NOT_FOUND
} from "@config/constants";
import { Response } from 'express';
import AuthService from "@auth/interface/service.interface";
import {RegisterDto} from "@api/auth/dto/register.dto";
import {LoginDto} from "@api/auth/dto/login.dto";
import Tokens from "@domain/app/token/interface/tokens.interface";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

const AuthService = () => Inject(AUTH_SERVICE);

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(
        @AuthService() private authService: AuthService
    ) {}

    @ApiOperation({ summary: "Регистрация" })
    @ApiResponse({ status: 201, description: SUCCESSFUL_REGISTER })
    @ApiResponse({ status: 400, description: USER_ALREADY_EXISTS })
    @ApiBody({ type: RegisterDto })
    @Post('register')
    @HttpCode(201)
    async register(@Body() dto: RegisterDto, @Res() response: Response) {
        const { data, ...result } = await this.authService.register(dto);
        const { accessToken, refreshToken } = data.tokens as Tokens;

        return response
            .cookie('access_token', accessToken)
            .cookie('refresh_cookie', refreshToken)
            .json({ ...result, data: data.user });
    }

    @ApiOperation({ summary: "Авторизация" })
    @ApiResponse({ status: 200, description: SUCCESSFUL_AUTHORIZATION })
    @ApiResponse({ status: 400, description: USER_NOT_FOUND })
    @ApiResponse({ status: 422, description: AUTHORIZATION_EXCEPTION })
    @ApiBody({ type: LoginDto })
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto, @Res() response: Response) {
        const { data, ...result } = await this.authService.login(dto);
        const { accessToken, refreshToken } = data.tokens as Tokens;

        return response
            .cookie('access_token', accessToken)
            .cookie('refresh_cookie', refreshToken)
            .json({ ...result, data: data.user });
    }
}
