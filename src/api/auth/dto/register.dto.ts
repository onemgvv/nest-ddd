import {Exclude} from "class-transformer";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class RegisterDto {
    @ApiProperty({
        type: String,
        description: 'Имя',
        example: 'Магомед',
    })
    @Exclude()
    @IsString()
    @IsOptional()
    given_name?: string;

    @ApiProperty({
        type: String,
        description: 'Фамилия',
        example: 'Гасанов',
    })
    @Exclude()
    @IsString()
    @IsOptional()
    family_name?: string;

    @ApiProperty({
        type: String,
        description: 'Имя пользователя',
        example: 'onemgvv',
    })
    @Exclude()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
    })
    @Exclude()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Пароль',
        example: 'СуперСложныйПароль123',
    })
    @Exclude()
    @IsString()
    @IsNotEmpty()
    password: string;
}
