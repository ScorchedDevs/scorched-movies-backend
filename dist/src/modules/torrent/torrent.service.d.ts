import { MessageOutput } from '../common/dto/message.output';
import { MoviesService } from '../movies/movies.service';
import { GatewayService } from '../gateway/gateway.service';
import { SubsdownloaderService } from '../subsdownloader/subsdownloader.service';
import { PlexService } from '../plex/plex.service';
export declare class TorrentService {
    private readonly moviesService;
    private readonly gatewayService;
    private readonly subsdownloaderService;
    private readonly plexService;
    constructor(moviesService: MoviesService, gatewayService: GatewayService, subsdownloaderService: SubsdownloaderService, plexService: PlexService);
    private readonly logger;
    donwloadTorrent(downloadTorrentInput: any, user: any): Promise<MessageOutput>;
}
