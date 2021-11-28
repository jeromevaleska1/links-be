import { ConfigService } from '@nestjs/config';
export interface IRecord {
    session: string;
    views: number;
    url: string;
    shorturl: string;
}
export interface ISaveParameters {
    sessionId: string;
    longUrl: string;
    shortUrl: string;
    views: number;
}
export interface ISaveResult {
    sessionID: string;
    link: string;
}
export declare class PgService {
    private config;
    private client;
    constructor(config: ConfigService);
    save({ sessionId, longUrl, shortUrl, views }: ISaveParameters): Promise<any>;
    getUrls(sessionId: string): Promise<IRecord[]>;
}
