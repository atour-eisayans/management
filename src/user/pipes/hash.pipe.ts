import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { generateHash } from '../hash/hash';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'object') {
      return value;
    }

    const { password = '' } = value;

    if (!password) {
      return value;
    }

    return {
      ...value,
      password: await generateHash(password),
    };
  }
}
