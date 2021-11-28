import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { IRecord, PgService } from 'src/pg/pg.service';

interface ILinkParams{
    sessionId: string;
    longUrl: string;
    views:number;
}
@Injectable()
export class LinksService {
    constructor(private pg: PgService, private config: ConfigService){}

    async getLink({sessionId, longUrl, views}:ILinkParams):Promise<string>{
        const BASE_URL = this.config.get('baseUrl')
        const shortUrl = `${BASE_URL}/${crypto.randomBytes(20).toString('hex').substr(0,5)}`;
        await this.pg.save({sessionId, views, longUrl, shortUrl});
        return shortUrl
    }

    async getUserData(sessionId:string):Promise<IRecord[]>{
        return this.pg.getUrls(sessionId)
    }

}
