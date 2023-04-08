import { YtsService } from './yts.service';
import { ListMoviesInput } from './dto/list.movies.input';
export declare class YtsController {
    private readonly ytsService;
    constructor(ytsService: YtsService);
    lstMovies({ limit, page, searchQuery }: ListMoviesInput): Promise<any>;
}
