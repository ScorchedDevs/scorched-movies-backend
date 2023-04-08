import { PrismaService } from 'nestjs-prisma';
import { MoviesService } from '../movies/movies.service';
export declare class CleanupService {
    private readonly prismService;
    private readonly moviesService;
    constructor(prismService: PrismaService, moviesService: MoviesService);
    private readonly logger;
    deleteMovies(): Promise<void>;
    subtractDays: (date: any, days: any) => any;
}
