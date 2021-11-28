import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

export interface IRecord{
    session: string;
    views: number;
    url: string;
    shorturl: string;
  }
export interface ISaveParameters{
    sessionId: string;
    longUrl: string;
    shortUrl: string;
    views: number;
}
export interface ISaveResult{
    sessionID: string;
    link: string;
}

const insertText = 'INSERT INTO urls(session, views, url, shortUrl) VALUES ($1, $2, $3, $4)'
const selectText = 'select session, views, url, shortUrl from urls where session = $1'
@Injectable()
export class PgService {
private client: Client;
    constructor(private config: ConfigService){
        this.client = this.config.get('pgClient')
    }

    async save({sessionId, longUrl, shortUrl, views}:ISaveParameters):Promise<any>{
        const res =  this.client.query(insertText, [sessionId, views, longUrl, shortUrl])
        console.log({res})
        return res;
    }

    async getUrls(sessionId: string):Promise<IRecord[]>{
        const {rows} = await this.client.query(selectText, [sessionId])
        return rows
    }
}
