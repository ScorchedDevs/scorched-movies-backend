import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class YtsService {
  constructor(private readonly configService: ConfigService) {}
  logger = new Logger(YtsService.name);

  async getMovies(limit: number, page: number, search = null): Promise<any> {
    let searchQuery = '';
    if (search) {
      searchQuery = `&query_term=${search}`;
    }
    const { data } = await axios
      .get<any>(
        `${this.configService.get(
          'YTS_URL',
        )}/api/v2/list_movies.json?limit=${limit}&page=${page}${searchQuery}`,
      )
      .catch((e) => {
        throw new Error(e);
      });
    return data;
  }
}
