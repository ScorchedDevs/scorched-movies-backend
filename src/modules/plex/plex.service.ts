import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PlexService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(PlexService.name);

  async scanLibraries() {
    try {
      axios.get(
        `${this.configService.get(
          'PLEX_URL',
        )}/library/sections/all/refresh?X-Plex-Token=${this.configService.get(
          'PLEX_TOKEN',
        )}`,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
