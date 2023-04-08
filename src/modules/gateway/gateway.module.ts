import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Module({
  providers: [GatewayService],
  controllers: [],
  exports: [GatewayService],
})
export class GatewayModule {}
