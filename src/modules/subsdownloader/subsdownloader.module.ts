import { Module } from '@nestjs/common';
import { SubsdownloaderService } from './subsdownloader.service';

@Module({
  providers: [SubsdownloaderService],
  exports: [SubsdownloaderService],
})
export class SubsdownloaderModule {}
