import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token provided');
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      client.user = decoded;
      return true;
    } catch (err) {
      console.log('Token verification failed', err);
      return false;
    }
  }
}
