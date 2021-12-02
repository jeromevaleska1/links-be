import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { LinksService } from './links.service';
import { PgService } from '../pg/pg.service';
import { UrlService } from '../url/url.service';
import { mockRecords, mockSessionId } from '../fixtures';
jest.mock('../pg/pg.service');

export const mockUrlService = {
  getShortUrl: jest.fn(),
};
export const mockPgService = {
  save: jest.fn(),
  getUrls: jest.fn(),
};
const mockGetLinkPayload = { sessionId: '', longUrl: '', views: 0 };
describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation(
              (name) =>
                ({
                  baseUrl: 'https://tier.app',
                  pgClient: jest.fn(),
                }[name]),
            ),
          },
        },
        {
          provide: UrlService,
          useValue: mockUrlService,
        },
        {
          provide: PgService,
          useValue: mockPgService,
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get link', async () => {
    const resolvedShort = '65c21';
    const mockResolvedShortUrl = `https://tier.app/${resolvedShort}`;
    mockUrlService.getShortUrl.mockImplementation(() => resolvedShort);
    mockPgService.save.mockResolvedValue(true);
    expect(await service.getLink(mockGetLinkPayload)).toEqual(
      mockResolvedShortUrl,
    );
    expect(mockPgService.save).toBeCalled();
  });
  it('should get user data', async () => {

    mockPgService.getUrls.mockResolvedValue(mockRecords);
    expect(await service.getUserData(mockSessionId)).toEqual(mockRecords);
    expect(mockPgService.getUrls).toBeCalled();
  });
});
