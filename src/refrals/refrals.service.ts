import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReferralDto } from './dto/create-refral.dto';
import { ApplyReferralDto } from './dto/apply-referral.dto';
import * as crypto from 'crypto';

@Injectable()
export class ReferralService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Create referral for a job
  async createReferral(referrerId: string, dto: CreateReferralDto) {
    const job = await this.prisma.job.findFirst({
      where: {
        id: dto.jobId,
        isDeleted: false,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Optional: prevent non-owner from creating referral
    if (job.createdById !== referrerId) {
      throw new ForbiddenException('You cannot create referral for this job');
    }

    const code = crypto.randomBytes(6).toString('hex');

    return this.prisma.referral.create({
      data: {
        code,
        referrerId,
        jobId: dto.jobId,
      },
    });
  }

  // ✅ Apply referral code
  async applyReferral(dto: ApplyReferralDto) {
    const referral = await this.prisma.referral.findFirst({
      where: {
        code: dto.code,
        isDeleted: false,
      },
    });

    if (!referral) {
      throw new NotFoundException('Invalid referral code');
    }

    if (referral.isUsed) {
      throw new BadRequestException('Referral code already used');
    }

    if (referral.referrerId === dto.refereeId) {
      throw new BadRequestException('Self-referral is not allowed');
    }

    return this.prisma.referral.update({
      where: { id: referral.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
        refereeId: dto.refereeId,
      },
    });
  }

  // ✅ Get referrals created by user
  async getMyCreatedReferrals(userId: string) {
    return this.prisma.referral.findMany({
      where: {
        referrerId: userId,
        isDeleted: false,
      },
      include: {
        job: true,
        referee: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ✅ Soft delete referral
  async deleteReferral(referralId: string, userId: string) {
    const referral = await this.prisma.referral.findFirst({
      where: {
        id: referralId,
        isDeleted: false,
      },
    });

    if (!referral) {
      throw new NotFoundException('Referral not found');
    }

    if (referral.referrerId !== userId) {
      throw new ForbiddenException('You cannot delete this referral');
    }

    return this.prisma.referral.update({
      where: { id: referralId },
      data: {
        isDeleted: true,
      },
    });
  }
}
