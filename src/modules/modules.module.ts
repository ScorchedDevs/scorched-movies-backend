import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TorrentModule } from './torrent/torrent.module';
import { YtsModule } from './yts/yts.module';
import { MoviesModule } from './movies/movies.module';
import { GatewayModule } from './gateway/gateway.module';
import { SubsdownloaderModule } from './subsdownloader/subsdownloader.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { PlexModule } from './plex/plex.module';
@Module({
  imports: [
    UserModule,
    TorrentModule,
    YtsModule,
    MoviesModule,
    GatewayModule,
    SubsdownloaderModule,
    CleanupModule,
    PlexModule,
  ],
})
export class ModulesModule {}
