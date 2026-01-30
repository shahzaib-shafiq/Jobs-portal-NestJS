import { PartialType } from '@nestjs/mapped-types';
import { CreateReferralDto } from './create-refral.dto';

export class UpdateReferralDto extends PartialType(CreateReferralDto) {}
