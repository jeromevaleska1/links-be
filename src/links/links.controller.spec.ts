import { Test, TestingModule } from '@nestjs/testing';
import { mockSessionId } from '../fixtures';
import { LinksController, RequestWithSession } from './links.controller';
import { LinksService } from './links.service';
export const mockLinksService = {
  getLink: jest.fn(),
  getUserData: jest.fn(),
};
describe('LinksController', () => {
  let controller: LinksController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        {
          provide: LinksService,
          useValue: mockLinksService,
        },
      ],
      controllers: [LinksController,
        
      ],
    }).compile();

    controller = module.get<LinksController>(LinksController);
    
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make a link request', async () => {
    await controller.getLink( {url: 'http://google.coom'}, 
    {sessionID: mockSessionId} as RequestWithSession, {
     views:0 
    }
  )
    expect(mockLinksService.getLink).toBeCalledWith({
       "longUrl": "http://google.coom",
        "sessionId": "mockSessionId",
        "views": 1,
       })
  })


  it('should make a user request', async () => {
    await controller.getUserData(  
    {sessionID: mockSessionId} as RequestWithSession
  )
    expect(mockLinksService.getUserData).toBeCalledWith(mockSessionId)
  })
});
