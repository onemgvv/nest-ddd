import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Пароль',
        example: 'СуперСложныйПароль123',
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    password: string;
}
