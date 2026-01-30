import { PartialType } from '@nestjs/mapped-types';
import { ScheduleInterviewDto } from './create-interview.dto';

export class UpdateInterviewDto extends PartialType(ScheduleInterviewDto) {}
