import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { rmSync } from 'fs';
import { PrismaService } from 'nestjs-prisma';
import { MoviesService } from '../movies/movies.service';
import { PlexService } from '../plex/plex.service';

@Injectable()
export class CleanupService {
  constructor(
    private readonly prismService: PrismaService,
    private readonly moviesService: MoviesService,
    private readonly plexService: PlexService,
  ) {}

  private readonly logger = new Logger(CleanupService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteMovies() {
    const movies = await this.prismService.movie.findMany({
      where: {
        AND: [
          {
            finishedDownloadingAt: {
              lte: this.subtractDays(new Date(), 7),
            },
          },
          {
            deletedAt: null,
          },
        ],
      },
    });
    for (const movie of movies) {
      this.logger.log(`Deleting movie ${movie.name}`);
      rmSync(movie.dir, { recursive: true, force: true });
      movie.dir = null;
      movie.deletedAt = new Date();
      this.moviesService.updateMovie(movie);
    }
    this.plexService.scanLibraries();
  }

  subtractDays = (date, days) => {
    date.setDate(date.getDate() - days);
    return date;
  };
}
