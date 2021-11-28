import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { LinksService } from './links.service';
import { Request } from 'express';

interface RequestWithSession extends Request{
    sessionID: string
}

export class GetLinkDTO{
    url: string;
}

@Controller('links')
export class LinksController {
    constructor(private linksService: LinksService ){}
    
    @Post('link')
    async getLink(@Body() body:GetLinkDTO, @Req() req: RequestWithSession, @Session() session: { views?: number }){
        session.views = (session.views || 0) + 1;
        // console.log(req)
        const { sessionID } = req; 
        const link = await this.linksService.getLink({sessionId: sessionID, views:session.views, longUrl:body.url})
        console.log({sessionID, link})
        return {link , views: session.views}
    }

    @Get('user')
    async getUserData(@Req() req: RequestWithSession){
        const { sessionID } = req; 
        console.log({sessionID})
        const res = await this.linksService.getUserData(sessionID)
        console.log(res)
        return res
    }

}
