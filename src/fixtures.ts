import { ISaveParameters } from "./pg/pg.service";

export const mockRecords = [
    { session: 'session', views: 0, url: 'url', shorturl: 'shorturl' },
];

export const mockSavePayload: ISaveParameters = {
    sessionId:'sessionId',
    views:0,
    longUrl:'long url',
    shortUrl: 'short url',
}

export const mockSessionId = 'mockSessionId'