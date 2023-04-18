import { ValidationPipeOptions } from '@nestjs/common';
import { exceptionFactory } from './validator.exceptionFactory';

export const validatorOptions: ValidationPipeOptions = {
  exceptionFactory,
  whitelist: true,
  transform: true,
  validationError: {
    target: true,
  },
};
