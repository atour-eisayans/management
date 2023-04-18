import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DatabaseException } from '../exceptions/database.exception';
import { Response } from 'express';
import { isProd } from 'src/helpers/environment';

@Catch(DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: DatabaseException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      statusCode,
      data: !isProd() ? exception.cause : exception.message,
    });
  }
}
