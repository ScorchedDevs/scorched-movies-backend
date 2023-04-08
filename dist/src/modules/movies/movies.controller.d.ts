import { MoviesService } from './movies.service';
import { Movie, User } from '@prisma/client';
export declare class MoviesController {
    private readonly movieService;
    constructor(movieService: MoviesService);
    findUserMovies(user: User): Promise<Movie[]>;
}
