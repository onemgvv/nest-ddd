/**
 *
 * Tokens
 *
 */
export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';
export const ACCESS_TOKEN_IS_NOT_SET = 'Access token is not set';
export const REFRESH_TOKEN_IS_NOT_SET = 'Refresh token is not set';
export const REFRESH_TOKEN_IS_NOT_VALID = 'Refresh token is not valid';

/**
 *
 * Messages
 *
 */
export const SUCCESSFUL_REGISTER = 'Вы успешно зарегистрировались в системе';
export const SUCCESSFUL_AUTHORIZATION = 'Вы успешно авторизовались в системе';

/**
 *
 * Exceptions
 *
 */
export const ROLE_NOT_FOUND = 'Роль не найдена';
export const ROLES_NOT_FOUND = 'В системе нет ролей';

export const USER_NOT_FOUND = 'Пользователь не найден';
export const USER_ALREADY_EXISTS = 'Пользователь с таким адресом уже есть в системе';
export const USERS_NOT_FOUND = 'В системе нет пользователей';

export const AUTHORIZATION_EXCEPTION = 'Не верный логин или пароль';

export const UNAUTHORIZED_EXCEPTION = 'Авторизуйтесь в системе для доступа к функции';

/**
 *
 * Repository providers
 *
 */
export const USER_REPOSITORY = 'UserRepo';
export const TOKEN_REPOSITORY = 'TokenRepo';

/**
 *
 * Service providers
 *
 */
export const USER_SERVICE = 'UserService';
export const AUTH_SERVICE = 'AuthService';
export const TOKEN_SERVICE = 'TokenService';