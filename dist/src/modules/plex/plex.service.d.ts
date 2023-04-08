import { ConfigService } from '@nestjs/config';
export declare class PlexService {
    private readonly configService;
    constructor(configService: ConfigService);
    scanLibraries(): Promise<void>;
}
