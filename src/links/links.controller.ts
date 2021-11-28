import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { LinksService } from './links.service';
import { Request } from 'express';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

interface RequestWithSession extends Request{
    sessionID: string
}

export class GetLinkDTO{
    @ApiProperty({required: true})
    url: string;
}

@Controller('links')
export class LinksController {
    constructor(private linksService: LinksService ){}
    
    @Post('link')
    @ApiBody({ type: GetLinkDTO })

    async getLink(@Body() body:GetLinkDTO, @Req() req: RequestWithSession, @Session() session: { views?: number }){
        session.views = (session.views || 0) + 1;
        const { sessionID } = req; 
        const link = await this.linksService.getLink({sessionId: sessionID, views:session.views, longUrl:body.url})
        return {link , views: session.views}
    }

    @Get('user')
    async getUserData(@Req() req: RequestWithSession){
        const { sessionID } = req; 
        return await this.linksService.getUserData(sessionID)
    }

}
