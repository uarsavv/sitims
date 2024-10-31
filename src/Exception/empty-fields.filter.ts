import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EmptyFieldsException } from './empty-fields.exception';

@Catch(EmptyFieldsException)
export class EmptyFieldsExceptionFilter implements ExceptionFilter {
  catch(exception: EmptyFieldsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}
