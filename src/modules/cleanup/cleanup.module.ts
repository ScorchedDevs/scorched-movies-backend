import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { MoviesModule } from '../movies/movies.module';
import { PlexModule } from '../plex/plex.module';
import { TorrentModule } from '../torrent/torrent.module';
import { CleanupController } from './cleanup.controller';

@Module({
  imports: [MoviesModule, PlexModule, TorrentModule],
  providers: [CleanupService],
  controllers: [CleanupController],
})
export class CleanupModule {}
