import { Module } from '@nestjs/common';
import { RefralsService } from './refrals.service';
import { RefralsController } from './refrals.controller';

@Module({
  controllers: [RefralsController],
  providers: [RefralsService],
})
export class RefralsModule {}
