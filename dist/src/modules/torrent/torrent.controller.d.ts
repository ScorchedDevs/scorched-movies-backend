import { TorrentService } from './torrent.service';
import { User } from '@prisma/client';
import { MessageOutput } from '../common/dto/message.output';
import { DownloadTorrentInput } from './dto/download.torrent.input';
export declare class TorrentController {
    private readonly torrentService;
    constructor(torrentService: TorrentService);
    downloadTorrent(downloadTorrentInput: DownloadTorrentInput, user: User): Promise<MessageOutput>;
}
