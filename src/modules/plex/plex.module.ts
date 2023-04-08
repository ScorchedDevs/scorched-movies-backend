import { Module } from '@nestjs/common';
import { PlexService } from './plex.service';

@Module({
  exports: [PlexService],
  providers: [PlexService],
})
export class PlexModule {}
