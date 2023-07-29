import { Test, TestingModule } from '@nestjs/testing';
import { CleanupController } from './cleanup.controller';

describe('CleanupController', () => {
  let controller: CleanupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanupController],
    }).compile();

    controller = module.get<CleanupController>(CleanupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
