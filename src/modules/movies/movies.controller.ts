import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Movie, Role, User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get('userMovies')
  @Roles(Role.DOWNLOADER, Role.ADMIN)
  findUserMovies(@CurrentUser() user: User): Promise<Movie[]> {
    return this.movieService.findUserMovies(user);
  }
}
