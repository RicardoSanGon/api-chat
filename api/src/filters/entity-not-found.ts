import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Resource not found',
      },
    });
  }
}
