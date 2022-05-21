import UserEntity from "@persistence/app/user/user.entity";

export default class UserModel {
    private _id: number;
    private _given_name: string;
    private _family_name: string;
    private _username: string;
    private _email: string;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get given_name(): string {
        return this._given_name;
    }

    set given_name(value: string) {
        this._given_name = value;
    }

    get family_name(): string {
        return this._family_name;
    }

    set family_name(value: string) {
        this._family_name = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    static toModel(user: UserEntity) {
        const model = new UserModel();
        model.id = user.id;
        model.given_name = user.given_name;
        model.family_name = user.family_name;
        model.username = user.username;
        model.email = user.email;
        return model;
    }
}