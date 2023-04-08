import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [MoviesModule],
  providers: [CleanupService],
})
export class CleanupModule {}
