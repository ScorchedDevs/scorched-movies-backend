import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PlexService {
  constructor(private readonly configService: ConfigService) {}

  async scanLibraries() {
    axios.get(
      `http://${this.configService.get(
        'PLEX_URL',
      )}:32400/library/sections/all/refresh?X-Plex-Token=${this.configService.get(
        'PLEX_TOKEN',
      )}`,
    );
  }
}
