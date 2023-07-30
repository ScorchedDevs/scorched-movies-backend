import { Logger, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GatewayService implements OnModuleInit {
  private readonly logger = new Logger(GatewayService.name);

  @WebSocketServer() public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Connected to websocket ${socket.id}`);
    });
  }
}
