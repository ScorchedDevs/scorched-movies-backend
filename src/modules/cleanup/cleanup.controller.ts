import { Body, Controller, Post } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Movie, Role } from '@prisma/client';
import { MessageOutput } from '../common/dto/message.output';

@Controller('cleanup')
export class CleanupController {
  constructor(private readonly cleanupService: CleanupService) {}

  @Roles(Role.ADMIN, Role.DOWNLOADER)
  @Post('deleteMovie')
  deleteMovie(@Body() movie: Movie): Promise<MessageOutput> {
    return this.cleanupService.deleteMovie(movie);
  }
}
