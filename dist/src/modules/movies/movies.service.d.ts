import { Movie, Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from '../user/user.service';
export declare class MoviesService {
    private readonly prismaService;
    private readonly userService;
    constructor(prismaService: PrismaService, userService: UserService);
    private logger;
    create(movieCreateInput: Prisma.MovieCreateInput): Promise<Movie>;
    updateMovie(movie: Movie): Promise<Movie>;
    findUserMovies(user: User): Promise<Movie[]>;
    findMovie({ name, quality }: Movie): Promise<Movie>;
    updateMovieUsers(movie: Movie, user: User): Promise<Movie>;
}
