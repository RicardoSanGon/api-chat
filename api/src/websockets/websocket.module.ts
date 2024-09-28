import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
