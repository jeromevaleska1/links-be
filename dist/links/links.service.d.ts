import { ConfigService } from '@nestjs/config';
import { IRecord, PgService } from 'src/pg/pg.service';
interface ILinkParams {
    sessionId: string;
    longUrl: string;
    views: number;
}
export declare class LinksService {
    private pg;
    private config;
    constructor(pg: PgService, config: ConfigService);
    getLink({ sessionId, longUrl, views }: ILinkParams): Promise<string>;
    getUserData(sessionId: string): Promise<IRecord[]>;
}
export {};
