import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {TokenEntity} from "@persistence/app/token/token.entity";

@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    given_name: string;

    @Column('varchar')
    family_name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;

    @OneToOne(
        () => TokenEntity,
        (token) => token.user)
    @JoinColumn()
    token: TokenEntity;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;
}