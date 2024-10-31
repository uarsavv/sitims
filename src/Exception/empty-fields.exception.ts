import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyFieldsException extends HttpException {
  constructor(fields: string[]) {
    super(
      {
        message: `Следующие поля не заполнены: ${fields.join(',')}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
