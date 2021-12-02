import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRecord, PgService } from '../pg/pg.service';
import { UrlService } from '../url/url.service';

interface ILinkParams {
  sessionId: string;
  longUrl: string;
  views: number;
}
@Injectable()
/**
 * Service providing links and user data
 */
export class LinksService {
  constructor(
    private pg: PgService,
    private config: ConfigService,
    private urlService: UrlService,
  ) {}

  async getLink({ sessionId, longUrl, views }: ILinkParams): Promise<string> {
    const BASE_URL = this.config.get('baseUrl');
    const shortUrl = `${BASE_URL}/${this.urlService.getShortUrl()}`;
    await this.pg.save({ sessionId, views, longUrl, shortUrl });
    return shortUrl;
  }

  async getUserData(sessionId: string): Promise<IRecord[]> {
    return this.pg.getUrls(sessionId);
  }
}
