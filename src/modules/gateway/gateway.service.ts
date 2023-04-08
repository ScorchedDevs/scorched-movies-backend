import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GatewayService implements OnModuleInit {
  @WebSocketServer() public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }
}
