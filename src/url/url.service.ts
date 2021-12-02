import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
/**
 * service to provide unique short url part
 */
export class UrlService {
  getShortUrl() {
    return `${crypto.randomBytes(20).toString('hex').substr(0, 5)}`;
  }
}
