import { Test, TestingModule } from '@nestjs/testing';
import { RefralsController } from './refrals.controller';
import { RefralsService } from './refrals.service';

describe('RefralsController', () => {
  let controller: RefralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefralsController],
      providers: [RefralsService],
    }).compile();

    controller = module.get<RefralsController>(RefralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
