// import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
// import { WsException } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @Catch(WsException)
// export class WsExceptionFilter implements ExceptionFilter {
//   constructor(private server) {}
//   private readonly logger = new Logger(WsExceptionFilter.name);

//   catch(exception: WsException, host: ArgumentsHost) {
//     const ctx = host.switchToWs();
//     const client = ctx.getClient();

//     const errorMessage = exception.message || 'Unknown error';

//     this.logger.error(`WebSocket error: ${errorMessage}`);

//     this.server
//       .to(client.id)
//       .emit('error', `{ status: 'error', message: errorMessage }`);
//     // client.emit('error', { status: 'error', message: errorMessage });
//   }
// }
