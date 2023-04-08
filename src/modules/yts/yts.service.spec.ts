import { Test, TestingModule } from '@nestjs/testing';
import { YtsService } from './yts.service';

describe('YtsService', () => {
  let service: YtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtsService],
    }).compile();

    service = module.get<YtsService>(YtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
