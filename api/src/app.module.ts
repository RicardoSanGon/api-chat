import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { WebsocketModule } from './websockets/websocket.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
@Module({
  imports: [
    WebsocketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'chat',
      username: 'postgres',
      password: 'root',
      synchronize: true,
      entities: [User],
    }),
    UserModule,
    AuthModule,
    MessageModule,
    TypeOrmModule.forRoot({
      name: 'MongoConnection',
      type: 'mongodb',
      url: 'mongodb+srv://Angel:20032912@angel.b01blpe.mongodb.net/?retryWrites=true&w=majority&appName=Angel',
      database: 'chat',
      synchronize: true,
      entities: [Message],
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Message], 'MongoConnection'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
