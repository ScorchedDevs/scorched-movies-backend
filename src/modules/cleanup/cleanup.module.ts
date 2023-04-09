import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { MoviesModule } from '../movies/movies.module';
import { PlexModule } from '../plex/plex.module';

@Module({
  imports: [MoviesModule, PlexModule],
  providers: [CleanupService],
})
export class CleanupModule {}
