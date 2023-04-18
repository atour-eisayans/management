import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(data: any) {
    super('database error', HttpStatus.BAD_REQUEST, {
      cause: data,
    });
  }
}
