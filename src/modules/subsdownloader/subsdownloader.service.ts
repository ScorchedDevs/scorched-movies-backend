import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createWriteStream } from 'fs';
import * as https from 'https';
import { string } from 'joi';

@Injectable()
export class SubsdownloaderService {
  constructor(private readonly configService: ConfigService) {}

  logger = new Logger(SubsdownloaderService.name);

  token!: string;

  async getSubs(imdbId, directory) {
    try {
      const loginBody = {
        username: this.configService.get('OPENSUBS_LOGIN'),
        password: this.configService.get('OPENSUBS_PASSWORD'),
      };
      const { data } = await axios
        .post('https://api.opensubtitles.com/api/v1/login', loginBody, {
          headers: {
            'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
          },
        })
        .catch((e) => {
          throw new Error(e);
        });
      this.token = data.token;
    } catch (error) {
      this.logger.error(error);
    }
    await this.delay(5000);
    try {
      const { data } = await axios
        .get<any>(
          `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}&languages=pt-br,en`,
          {
            headers: {
              'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
            },
          },
        )
        .catch((e) => {
          throw new Error(e);
        });
      await this.delay(5000);
      for (const sub of data.data) {
        const queryData = {
          file_id: sub.attributes.files[0].file_id,
        };
        try {
          const { data } = await axios
            .post(`https://api.opensubtitles.com/api/v1/download`, queryData, {
              headers: {
                'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${this.token}`,
                Accept: '*/*',
              },
            })
            .catch((e) => {
              throw new Error(e);
            });

          https.get(data.link, (res) => {
            const path = `${directory}/${data.file_name}`;
            const filePath = createWriteStream(path);
            res.pipe(filePath);
            filePath.on('finish', () => {
              filePath.close();
            });
          });
        } catch (error) {
          this.logger.error(error);
        }
        await this.delay(5000);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
