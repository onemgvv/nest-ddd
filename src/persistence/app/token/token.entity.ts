import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import UserEntity from "@persistence/app/user/user.entity";

@Entity({ name: 'tokens' })
export class TokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    refreshToken: string;

    @Column('int')
    userId: number;

    @OneToOne(
        () => UserEntity,
        user => user.token,
        { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;

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