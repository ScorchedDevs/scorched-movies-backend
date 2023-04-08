import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YtsService {
  logger = new Logger(YtsService.name);

  async getMovies(limit: number, page: number, search = null): Promise<any> {
    let searchQuery = '';
    if (search) {
      searchQuery = `&query_term=${search}`;
    }
    const { data } = await axios
      .get<any>(
        `http://yts.torrentbay.to/api/v2/list_movies.json?limit=${limit}&page=${page}${searchQuery}`,
      )
      .catch((e) => {
        throw new Error(e);
      });
    return data;
  }
}
