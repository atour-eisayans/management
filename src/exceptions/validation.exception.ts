import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export interface ValidationErrorsObject {
  [key: string]: string;
}

export class ValidationException extends HttpException {
  constructor(private errors: ValidationError[]) {
    const messages: ValidationErrorsObject = {};

    for (const error of errors) {
      if (error.constraints) {
        messages[error.property] = `${Object.values(error.constraints).join(
          '; ',
        )} ;`;
      }
    }
    super(
      {
        error: 'Validation failed',
        messages,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  toHRFormat(): ValidationErrorsObject {
    const r: ValidationErrorsObject = {};

    for (const error of this.errors) {
      if (error.constraints) {
        r[error.property] = `${Object.values(error.constraints).join('; ')} ;`;
      }
    }

    return r;
  }
}
