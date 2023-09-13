import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createWriteStream, fstat, lstatSync, readdirSync } from 'fs';
import * as https from 'https';
import { string } from 'joi';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class SubsdownloaderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly utilsService: UtilsService,
  ) {}

  logger = new Logger(SubsdownloaderService.name);

  token!: string;

  async getSubs(imdbId, directory) {
    try {
      const loginBody = {
        username: this.configService.get('OPENSUBS_LOGIN'),
        password: this.configService.get('OPENSUBS_PASSWORD'),
      };
      const { data } = await axios
        .post(
          `${this.configService.get('OPENSUBS_URL')}/api/v1/login`,
          loginBody,
          {
            headers: {
              'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
            },
          },
        )
        .catch((e) => {
          throw new Error(e);
        });
      this.token = data.token;
    } catch (error) {
      this.logger.error(error);
    }
    await this.utilsService.delay(1000);
    try {
      const { data } = await axios
        .get<any>(
          `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}&languages=pt-br,en`,
          {
            headers: {
              'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
              Authorization: `Bearer ${this.token}`,
            },
          },
        )
        .catch((e) => {
          throw new Error(e);
        });
      await this.utilsService.delay(1000);
      let page = data.page;
      this.logger.log(
        `Downloading ${data.total_count} subtitles for the movie of ID ${imdbId}`,
      );
      while (data.total_pages >= page) {
        for (const sub of data.data) {
          const queryData = {
            file_id: sub.attributes.files[0].file_id,
          };
          try {
            const { data } = await axios
              .post(
                `https://api.opensubtitles.com/api/v1/download`,
                queryData,
                {
                  headers: {
                    'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${this.token}`,
                    Accept: '*/*',
                  },
                },
              )
              .catch((e) => {
                throw new Error(e);
              });

            https.get(data.link, (res) => {
              const splitFileName = data.file_name.split('.');
              const extension = splitFileName.pop();
              splitFileName.push(sub.attributes.language);
              splitFileName.push(extension);
              const fileName = splitFileName.join('.');
              const items = readdirSync(directory);
              let movieSubdir;
              items.forEach((item) => {
                if (lstatSync(`${directory}/${item}`).isDirectory()) {
                  movieSubdir = `${directory}/${item}`;
                }
              });
              const path = `${movieSubdir}/${fileName}`;
              const filePath = createWriteStream(path);
              res.pipe(filePath);
              filePath.on('finish', () => {
                filePath.close();
              });
            });
          } catch (error) {
            this.logger.error(error);
          }
          await this.utilsService.delay(1000);
        }
        page++;
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
