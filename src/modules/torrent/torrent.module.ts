import { Module } from '@nestjs/common';
import { TorrentService } from './torrent.service';
import { TorrentController } from './torrent.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { MoviesModule } from '../movies/movies.module';
import { GatewayModule } from '../gateway/gateway.module';
import { UserModule } from '../user/user.module';
import { SubsdownloaderModule } from '../subsdownloader/subsdownloader.module';
import { PlexModule } from '../plex/plex.module';

@Module({
  imports: [
    UtilsModule,
    MoviesModule,
    GatewayModule,
    UserModule,
    SubsdownloaderModule,
    PlexModule,
  ],
  providers: [TorrentService],
  controllers: [TorrentController],
})
export class TorrentModule {}
