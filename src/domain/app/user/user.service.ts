import { compare } from 'bcrypt';
import {Inject, Injectable} from "@nestjs/common";
import UserService from "@domain/app/user/interface/service.interface";
import UserModel from "@domain/app/user/user.model";
import {ICreateUser} from "@domain/app/user/interface/create.interface";
import {USER_REPOSITORY} from "@config/constants";
import UserRepository from '@persistence/app/user/interface/repository.interface';
import UserEntity from "@persistence/app/user/user.entity";

const UserRepo = () => Inject(USER_REPOSITORY);

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @UserRepo() private userRepository: UserRepository
    ) {}

    /**
     *
     * Get all users
     *
     * @return {Promise<UserModel[]>}
     */
    async all(): Promise<UserModel[]> {
        const users = await this.userRepository.find();
        if(!users) return null;

        return Promise.all(users.map(user => UserModel.toModel(user)));
    }

    /**
     *
     * Create new user & Save him in DB
     *
     * @param dto
     * @return {Promise<UserModel>}
     *
     */
    async create(dto: ICreateUser): Promise<UserModel> {
        const token = await this.userRepository.save(dto);
        if(!token) return null;

        return UserModel.toModel(token);
    }

    /**
     *
     * Get user by Primary key (ID)
     *
     * @param id
     * @return {Promise<UserModel>}
     */
    async getById(id: number): Promise<UserModel> {
        const user = await this.userRepository.findById(id);
        if(!user) return null;

        return UserModel.toModel(user);
    }

    /**
     *
     * Find user by entity key
     *
     * @param key
     * @param value
     * @return {Promise<UserEntity>}
     */
    async findOne(key: keyof UserEntity, value: any): Promise<UserModel> {
        const user = await this.userRepository.findByField(key, value);
        if(!user) return null;

        return UserModel.toModel(user);
    }

    /**
     *
     * Compare users password
     *
     * @param id
     * @param password
     * @return boolean
     */
    async comparePassword(id: number, password: string): Promise<boolean> {
        const encrypted = await this.userRepository.findById(id).then(user => user.password);
        return compare(password, encrypted);
    }

    /**
     *
     * Get user by token
     *
     * @param token
     * @return {Promise<UserModel>}
     */
    async getByToken(token: string): Promise<UserModel> {
        const user = await this.userRepository.findByToken(token);
        if(!user) return null;

        return UserModel.toModel(user);
    }
}