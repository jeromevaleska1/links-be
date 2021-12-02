import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PgService, insertText, selectText } from './pg.service';
import { mockSavePayload, mockSessionId } from '../fixtures';

jest.mock('pg')
describe('PgService', () => {
  let service: PgService;
  let configService: ConfigService
  const mockQuery =  jest.fn().mockImplementation(() => ({rows: []}))
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation(
              (name) =>
                ({
                  baseUrl: 'https://tier.app',
                  pgClient: {
                    query: mockQuery
                  },
                }[name]),
            ),
          },
        },
    ],
    }).compile();

    service = module.get<PgService>(PgService);
    configService = module.get<ConfigService>(ConfigService);
    
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should execute save query', async () => {
    await service.save(mockSavePayload)
    expect(mockQuery).toBeCalled()
    expect(mockQuery).toBeCalledWith(insertText, [...Object.values(mockSavePayload)])
  })

  it('should execute getUrls query', async () => {
    await service.getUrls(mockSessionId)
    expect(mockQuery).toBeCalled()
    expect(mockQuery).toBeCalledWith(selectText, [mockSessionId])
  })
});
