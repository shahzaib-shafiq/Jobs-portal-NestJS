import { Module } from '@nestjs/common';
import { InterviewService } from './interviews.service';
import { InterviewController } from './interviews.controller';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewsModule {}
