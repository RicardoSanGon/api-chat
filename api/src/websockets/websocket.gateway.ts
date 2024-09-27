import { WebSocketGateway, 
    WebSocketServer, 
    OnGatewayConnection, 
    OnGatewayDisconnect, 
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
 } from '@nestjs/websockets';
import {Server, Socket,} from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    handleConnection(client: Socket) {
        console.log('Client connected ');
    }
    handleDisconnect(client: any) {
        console.log('Client disconnected ');
    }

    @SubscribeMessage('mensaje')
    handleMessage(@ConnectedSocket() client:Socket, @MessageBody() data:any){
    console.log(data);
    //este es para que todos reciban el mensaje incluyendo al que lo mando
    //this.server.emit('mensajeservidor',data);
    //este envia de un socket al resto de sockets
    client.broadcast.emit('mensajseservidor',data);
    }
}




