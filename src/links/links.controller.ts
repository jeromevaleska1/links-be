import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { LinksService } from './links.service';
import { Request } from 'express';
import { ApiBody, ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export interface RequestWithSession extends Request {
  sessionID: string;
}

export class GetLinkDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
export class GetLinkResponseDto {
  @ApiProperty()
  link: string;

  @ApiProperty()
  views: number;
}

export class GetUserDataResponseDto {
  @ApiProperty()
  session: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  shorturl: string;
}

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post('link')
  @ApiBody({ type: GetLinkDTO, description: '' })
  @ApiCreatedResponse({
    description: 'Returns shortened url',
    type: GetLinkResponseDto,
  })
  async getLink(
    @Body() body: GetLinkDTO,
    @Req() req: RequestWithSession,
    @Session() session: { views?: number },
  ) {
    session.views = (session.views || 0) + 1;
    const { sessionID } = req;
    const link = await this.linksService.getLink({
      sessionId: sessionID,
      views: session.views,
      longUrl: body.url,
    });
    return { link, views: session.views };
  }

  @ApiCreatedResponse({
    description: 'User related statistics',
    type: GetUserDataResponseDto,
  })
  @Get('user')
  async getUserData(@Req() req: RequestWithSession) {
    const { sessionID } = req;
    return await this.linksService.getUserData(sessionID);
  }
}
