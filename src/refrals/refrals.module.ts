import { Module } from '@nestjs/common';
import { ReferralService } from './refrals.service';
import { ReferralController} from './refrals.controller';

@Module({
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class RefralsModule {}
