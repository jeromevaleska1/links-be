import { ConfigService } from '@nestjs/config';
import { IRecord, PgService } from '../pg/pg.service';
import { UrlService } from '../url/url.service';
interface ILinkParams {
    sessionId: string;
    longUrl: string;
    views: number;
}
export declare class LinksService {
    private pg;
    private config;
    private urlService;
    constructor(pg: PgService, config: ConfigService, urlService: UrlService);
    getLink({ sessionId, longUrl, views }: ILinkParams): Promise<string>;
    getUserData(sessionId: string): Promise<IRecord[]>;
}
export {};
