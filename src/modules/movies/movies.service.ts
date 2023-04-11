import { Injectable, Logger } from '@nestjs/common';
import { Movie, Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from '../user/user.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  private logger = new Logger(MoviesService.name);

  async create(movieCreateInput: Prisma.MovieCreateInput): Promise<Movie> {
    return this.prismaService.movie.create({
      data: movieCreateInput,
    });
  }

  async updateMovie(
    movie: Prisma.MovieUpdateInput,
    user?: User,
  ): Promise<Movie> {
    if (user) {
      movie.users = { connect: [{ id: user.id }] };
    }
    return this.prismaService.movie.update({
      where: { id: movie.id as string },
      data: movie,
    });
  }

  async findUserMovies(user: User): Promise<Movie[]> {
    return this.prismaService.movie.findMany({
      where: {
        AND: [{ users: { some: { id: user.id } } }, { deletedAt: null }],
      },
    });
  }

  async findMovie({ name, quality }: Movie) {
    return this.prismaService.movie.findFirst({
      where: { name, quality },
    });
  }

  async updateMovieUsers(movie: Movie, user: User): Promise<Movie> {
    return this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        users: {
          connect: [{ id: user.id }],
        },
      },
    });
  }

  async getStillDownloading(): Promise<Movie[]> {
    return this.prismaService.movie.findMany({
      where: { finishedDownloadingAt: null },
    });
  }
}
