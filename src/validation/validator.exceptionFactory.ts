import { ValidationError } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

export const exceptionFactory = (errors: ValidationError[]) => {
  console.log('this is errors factory');
  errors.forEach((error) => console.log(error));

  return new ValidationException(errors);
};
