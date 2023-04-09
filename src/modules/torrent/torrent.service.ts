import { Injectable, Logger } from '@nestjs/common';
import * as torrentStream from 'torrent-stream';
import { MessageOutput } from '../common/dto/message.output';
import { MoviesService } from '../movies/movies.service';
import { Prisma } from '@prisma/client';
import { GatewayService } from '../gateway/gateway.service';
import { MessageType } from '../gateway/dto/message.type';
import { SubsdownloaderService } from '../subsdownloader/subsdownloader.service';
import { PlexService } from '../plex/plex.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TorrentService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly gatewayService: GatewayService,
    private readonly subsdownloaderService: SubsdownloaderService,
    private readonly plexService: PlexService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(TorrentService.name);

  async donwloadTorrent(downloadTorrentInput, user): Promise<MessageOutput> {
    const options = {
      path: this.configService.get('MOVIES_PATH'),
      verify: true,
      dht: true,
    };
    const engine = await torrentStream(
      downloadTorrentInput.magnetLink,
      options,
    );

    let movie = await this.moviesService.findMovie(downloadTorrentInput);

    if (!movie) {
      const movieCreateInput: Prisma.MovieCreateInput = {
        name: downloadTorrentInput.name,
        quality: downloadTorrentInput.quality,
        image: downloadTorrentInput.image,
      };
      movie = await this.moviesService.create(movieCreateInput);
    }

    movie = await this.moviesService.updateMovieUsers(movie, user);
    this.logger.log(movie.id);

    await this.gatewayService.server.emit('message', {
      id: movie.id,
      type: MessageType.DOWNLOAD_ADDED,
      content: { message: 'Movie was added to the queue' },
    });
    this.logger.log(movie.id);

    engine.on('ready', async () => {
      this.gatewayService.server.emit('message', {
        id: movie.id,
        type: MessageType.DOWNLOAD_STARTED,
        content: { message: 'Movie started downloading' },
      });
      for (const file of engine.files) {
        const stream = file.createReadStream();

        this.subsdownloaderService.getSubs(
          downloadTorrentInput.imdbId,
          `${this.configService.get('MOVIES_PATH')}/${file.path.split('/')[0]}`,
        );

        movie.dir = `${this.configService.get('MOVIES_PATH')}/${
          file.path.split('/')[0]
        }`;
        movie.finishedDownloadingAt = null;
        movie.deletedAt = null;
        movie = await this.moviesService.updateMovie(movie);
      }
    });
    engine.on('download', () => {
      const totalLength = engine.files
        .map((file) => file.length)
        .reduce(function (sum, value) {
          return sum + value;
        });

      const swarm: any = engine.swarm;
      this.gatewayService.server.emit('message', {
        id: movie.id,
        type: MessageType.DOWNLOAD_PROGRESS,
        content: {
          downloadedAmount: (engine.swarm.downloaded / totalLength) * 100,
          downloadSpeed: swarm.downloadSpeed(),
        },
      });
    });
    engine.on('idle', () => {
      movie.finishedDownloadingAt = new Date();
      this.moviesService.updateMovie(movie);
      this.gatewayService.server.emit('message', {
        id: movie.id,
        type: MessageType.DOWNLOAD_FINISHED,
        content: {
          message: 'Movie finished downloading',
        },
      });
      this.plexService.scanLibraries();
    });
    return { message: `O torrent foi baixado`, success: true };
  }
}
