import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
import { WsJwtGuard } from 'src/ws-jwt/ws-jwt.guard';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log('Client connected ' + client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected ' + client.id);
  }

  @SubscribeMessage('mensaje')
  async hanldeEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message:', data);
    // const res = await this.messageService.create(data, client.user.sub);

    //este es para que todos reciban el mensaje incluyendo al que lo mando
    //this.server.emit('mensajeservidor',data);
    //este envia de un socket al resto de sockets
    client.broadcast.emit('mensajeservidor', data);
  }
}
