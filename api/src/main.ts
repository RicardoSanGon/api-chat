import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

class MyIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundFilter());
  app.enableCors({ origin: 'http://localhost:4200', allowedHeaders: '*' });
  app.useWebSocketAdapter(new MyIoAdapter(app));
  await app.listen(3000);
}
bootstrap();
