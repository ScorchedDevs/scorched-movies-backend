import { Test, TestingModule } from '@nestjs/testing';
import { YtsController } from './yts.controller';

describe('YtsController', () => {
  let controller: YtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YtsController],
    }).compile();

    controller = module.get<YtsController>(YtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
