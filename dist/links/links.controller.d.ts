import { LinksService } from './links.service';
import { Request } from 'express';
interface RequestWithSession extends Request {
    sessionID: string;
}
export declare class GetLinkDTO {
    url: string;
}
export declare class GetLinkResponseDto {
    link: string;
    views: number;
}
export declare class GetUserDataResponseDto {
    session: string;
    views: number;
    url: string;
    shorturl: string;
}
export declare class LinksController {
    private linksService;
    constructor(linksService: LinksService);
    getLink(body: GetLinkDTO, req: RequestWithSession, session: {
        views?: number;
    }): Promise<{
        link: string;
        views: number;
    }>;
    getUserData(req: RequestWithSession): Promise<import("../pg/pg.service").IRecord[]>;
}
export {};
