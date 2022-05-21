import { plainToClass } from 'class-transformer';
import {
    ArgumentMetadata,
    Injectable,
    ValidationPipe,
    PipeTransform,
    UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe
    extends ValidationPipe
    implements PipeTransform<any>
{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        if (obj) return;

        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map((err) => {
                return `[${err.property.toUpperCase()}]: ${Object.values(
                    err.constraints,
                ).join(', ')}`;
            });

            throw new UnprocessableEntityException(messages);
        }
        return value;
    }
}