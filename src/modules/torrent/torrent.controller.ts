import { Body, Controller, Post, Res } from '@nestjs/common';
import { TorrentService } from './torrent.service';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { MessageOutput } from '../common/dto/message.output';
import { DownloadTorrentInput } from './dto/download.torrent.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('torrent')
export class TorrentController {
  constructor(private readonly torrentService: TorrentService) {}

  @Roles(Role.ADMIN, Role.DOWNLOADER)
  @Post('download')
  downloadTorrent(
    @Body() downloadTorrentInput: DownloadTorrentInput,
    @CurrentUser() user: User,
  ): Promise<MessageOutput | void> {
    return this.torrentService.donwloadTorrent(downloadTorrentInput, user);
  }
}
