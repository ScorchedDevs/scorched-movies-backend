import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SubsdownloaderService {
    private readonly configService;
    constructor(configService: ConfigService);
    logger: Logger;
    token: string;
    getSubs(imdbId: any, directory: any): Promise<void>;
    delay(ms: number): Promise<unknown>;
}
