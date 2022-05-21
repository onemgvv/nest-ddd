import UserEntity from "@persistence/app/user/user.entity";

export default class UserModel {
    private id: number;
    private givenName: string;
    private familyName: string;
    private username: string;
    private email: string;


    getId(): number { return this.id; }
    setId(value: number) { this.id = value; }

    getGivenName(): string { return this.givenName; }
    setGivenName(value: string) { this.givenName = value; }

    getFamilyName(): string { return this.familyName; }
    setFamilyName(value: string) { this.familyName = value; }

    getUsername(): string { return this.username; }
    setUsername(value: string) { this.username = value; }

    getEmail(): string { return this.email; }
    setEmail(value: string) { this.email = value; }

    static toModel(user: UserEntity) {
        const model = new UserModel();
        model.setId(user.id);
        model.setGivenName(user.giveName);
        model.setFamilyName(user.familyName);
        model.setUsername(user.username);
        model.setEmail(user.email);
        return model;
    }
}