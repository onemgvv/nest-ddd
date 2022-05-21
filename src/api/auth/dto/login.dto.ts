import {Exclude} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class LoginDto {
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
