// types/socket-io.d.ts
import 'socket.io';

declare module 'socket.io' {
  interface Socket {
    user?: any;
  }
}
