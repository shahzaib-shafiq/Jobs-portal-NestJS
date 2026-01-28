import { Test, TestingModule } from '@nestjs/testing';
import { RefralsService } from './refrals.service';

describe('RefralsService', () => {
  let service: RefralsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefralsService],
    }).compile();

    service = module.get<RefralsService>(RefralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
