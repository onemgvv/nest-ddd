import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        console.log("Object: ", object);
        const errors = await validate(object);
        console.log("Errors: ", errors);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return object;
    }

    private toValidate(metatype: any): boolean {
        const types: any[] = [
            Boolean,
            Number,
            Array,
            Object,
        ];
        return types.includes(metatype);
    }
}