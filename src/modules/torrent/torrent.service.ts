import { Injectable, Logger } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { Movie, Prisma } from '@prisma/client';
import { GatewayService } from '../gateway/gateway.service';
import { MessageType } from '../gateway/dto/message.type';
import { SubsdownloaderService } from '../subsdownloader/subsdownloader.service';
import { PlexService } from '../plex/plex.service';
import { ConfigService } from '@nestjs/config';
import * as Transmission from 'transmission';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class TorrentService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly gatewayService: GatewayService,
    private readonly subsdownloaderService: SubsdownloaderService,
    private readonly plexService: PlexService,
    private readonly configService: ConfigService,
    private readonly utilsService: UtilsService,
  ) {}

  async onModuleInit() {
    await this.refreshMovies();
    await this.startTorrents();
    await this.watchTorrents();
  }

  logger = new Logger(TorrentService.name);

  movies!: Movie[];

  public transmission = new Transmission({
    host: this.configService.get('TRANSMISSION_IP'),
    username: this.configService.get('TRANSMISSION_USER'),
    password: this.configService.get('TRANSMISSION_PASS'),
  });

  async donwloadTorrent(downloadTorrentInput, user) {
    await this.transmission.addUrl(
      downloadTorrentInput.magnetLink,
      {
        'download-dir': `${this.configService.get('TRANSMISSION_PATH')}/${
          downloadTorrentInput.imdbId
        }_${downloadTorrentInput.quality}`,
      },
      async (err, torrent) => {
        if (err) {
          this.logger.error(err);
          return {
            message: `Failed to start download with error: ${err}`,
            success: false,
          };
        }

        let movie: Movie | Prisma.MovieCreateInput =
          await this.moviesService.findMovie(downloadTorrentInput);

        if (!movie) {
          movie = {
            name: downloadTorrentInput.name,
            quality: downloadTorrentInput.quality,
            image: downloadTorrentInput.image,
            imdbId: downloadTorrentInput.imdbId,
          };
          movie = await this.moviesService.create(movie);
        }

        movie.torrentId = torrent.id;
        movie.dir = `${this.configService.get('MOVIES_PATH')}/${
          downloadTorrentInput.imdbId
        }_${downloadTorrentInput.quality}`;
        movie = await this.moviesService.updateMovie(movie as Movie, user);

        this.gatewayService.server.emit('message', {
          id: movie.id,
          type: MessageType.DOWNLOAD_STARTED,
          content: { message: 'Movie started downloading' },
        });
        await this.refreshMovies();
      },
    );
  }

  async watchTorrents() {
    await setTimeout(this.getTorrentData.bind(this), 3000);
  }

  async getTorrentData() {
    for (const movie of this.movies) {
      await this.transmission.get(movie.torrentId, async (err, result) => {
        if (err) {
          throw err;
        }
        if (result.torrents.length > 0) {
          let download_speed;
          if (result.torrents[0].rateDownload > 1000000) {
            download_speed = `${(
              result.torrents[0].rateDownload / 1000000
            ).toFixed(1)} Mb/s`;
          } else if (result.torrents[0].rateDownload > 1000) {
            download_speed = `${(
              result.torrents[0].rateDownload / 1000
            ).toFixed(1)} Kb/s`;
          } else {
            download_speed = `${result.torrents[0].rateDownload.toFixed(
              1,
            )} b/s`;
          }
          this.gatewayService.server.emit('message', {
            id: movie.id,
            type: MessageType.DOWNLOAD_PROGRESS,
            content: {
              downloadedAmount: result.torrents[0].percentDone * 100,
              downloadSpeed: download_speed,
            },
          });
          if (result.torrents[0].percentDone > 0 && !movie.downloadedSubs) {
            this.subsdownloaderService.getSubs(movie.imdbId, movie.dir);
            movie.downloadedSubs = true;
            this.moviesService.updateMovie(movie);
          }
          if (result.torrents[0].percentDone === 1) {
            this.transmission.remove(movie.torrentId, async (err) => {
              this.logger.error(err);
            });

            this.gatewayService.server.emit('message'),
              {
                id: movie.id,
                type: MessageType.DOWNLOAD_FINISHED,
                content: {
                  message: 'Movie finished downloading',
                },
              };

            movie.finishedDownloadingAt = new Date();
            movie.torrentId = null;

            this.moviesService.updateMovie(movie);
            this.refreshMovies();
          }
        }
      });
    }
    await this.watchTorrents();
  }

  async refreshMovies() {
    this.movies = await this.moviesService.getStillDownloading();
  }

  async startTorrents() {
    for (const movie of this.movies) {
      this.transmission.start(movie.torrentId, async (err, result) => {
        if (err) {
          this.logger.error(err);
        }
      });
    }
  }

  async removeTorrent(movie) {
    await this.transmission.remove(movie.torrentId, async (err, result) => {
      if (err) {
        this.logger.error(err);
      }
    });
  }
}
