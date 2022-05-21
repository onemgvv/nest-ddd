import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class RegisterDto {
    @ApiProperty({
        type: String,
        description: 'Имя',
        example: 'Магомед',
    })
    @IsString()
    @IsOptional()
    @Expose()
    given_name?: string;

    @ApiProperty({
        type: String,
        description: 'Фамилия',
        example: 'Гасанов',
    })
    @IsString()
    @IsOptional()
    @Expose()
    family_name?: string;

    @ApiProperty({
        type: String,
        description: 'Имя пользователя',
        example: 'onemgvv',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;

    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Пароль',
        example: 'СуперСложныйПароль123',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;
}
