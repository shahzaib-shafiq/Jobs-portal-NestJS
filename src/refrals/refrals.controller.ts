import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ReferralService } from './refrals.service';
import { CreateReferralDto } from './dto/create-refral.dto';
import { ApplyReferralDto } from './dto/apply-referral.dto';

import { Roles } from '../auth/roles.decorator';

@Controller('referrals')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  // ✅ Create referral
  @Roles('recruiter', 'admin')
  @Post()
  create(@Req() req, @Body() dto: CreateReferralDto) {
    const userId = req.user.userId;
    return this.referralService.createReferral(userId, dto);
  }

  // ✅ Apply referral code
  @Post('apply')
  apply(@Body() dto: ApplyReferralDto) {
    return this.referralService.applyReferral(dto);
  }

  // ✅ Get my created referrals
  @Roles('recruiter', 'admin')
  @Get('me')
  getMyReferrals(@Req() req) {
    const userId = req.user.userId;
    return this.referralService.getMyCreatedReferrals(userId);
  }

  // ✅ Delete referral
  @Roles('recruiter', 'admin')
  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.referralService.deleteReferral(id, userId);
  }
}
