import { IsUUID } from 'class-validator';

export class CreateReferralDto {
  @IsUUID()
  jobId: string;
}
