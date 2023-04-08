import { Test, TestingModule } from '@nestjs/testing';
import { SubsdownloaderService } from './subsdownloader.service';

describe('SubsdownloaderService', () => {
  let service: SubsdownloaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsdownloaderService],
    }).compile();

    service = module.get<SubsdownloaderService>(SubsdownloaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
