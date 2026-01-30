import { IsString, IsUUID } from 'class-validator';

export class ApplyReferralDto {
  @IsString()
  code: string;

  @IsUUID()
  refereeId: string;
}
