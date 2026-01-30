import { Module } from '@nestjs/common';
import { OfferService } from './offers.service';
import { OfferController } from './offers.controller';

@Module({
  controllers: [OfferController],
  providers: [OfferService],
})
export class OffersModule {}
