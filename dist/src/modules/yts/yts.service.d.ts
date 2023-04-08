import { Logger } from '@nestjs/common';
export declare class YtsService {
    logger: Logger;
    getMovies(limit: number, page: number, search?: any): Promise<any>;
}
