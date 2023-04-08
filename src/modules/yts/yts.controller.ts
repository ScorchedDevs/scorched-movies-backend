import { Body, Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { YtsService } from './yts.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ListMoviesInput } from './dto/list.movies.input';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('yts')
export class YtsController {
  constructor(private readonly ytsService: YtsService) {}

  @Roles(Role.USER, Role.ADMIN, Role.DOWNLOADER)
  @Get('list')
  lstMovies(
    @Query() { limit, page, searchQuery }: ListMoviesInput,
  ): Promise<any> {
    return this.ytsService.getMovies(limit, page, searchQuery);
  }
}
