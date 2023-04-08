import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class GatewayService implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
}
