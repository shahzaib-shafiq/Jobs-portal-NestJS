import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InterviewStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ScheduleInterviewDto,
  SubmitInterviewFeedbackDto,
} from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  // Recruiter schedules interview
  async scheduleInterview(recruiterId: string, dto: ScheduleInterviewDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Validate interviewer users exist
      const validInterviewers = await tx.user.findMany({
        where: {
          id: { in: dto.interviewerIds },
          isDeleted: false, // if you have soft delete
        },
        select: { id: true },
      });

      if (!validInterviewers.length) {
        throw new Error('No valid interviewers found');
      }

      const validInterviewerIds = validInterviewers.map((u) => u.id);

      // 2️⃣ Create interview
      const interview = await tx.interview.create({
        data: {
          applicationId: dto.applicationId,
          type: dto.type,
          round: dto.round,
          status: InterviewStatus.SCHEDULED,
          scheduledAt: new Date(dto.scheduledAt),
          durationMin: dto.durationMin,
          meetingLink: dto.meetingLink,
          location: dto.location,
          createdById: recruiterId,
        },
      });

      // 3️⃣ Assign interviewers (safe now)
      await tx.interviewInterviewer.createMany({
        data: validInterviewerIds.map((id) => ({
          interviewId: interview.id,
          interviewerId: id,
        })),
        skipDuplicates: true,
      });

      return interview;
    });
  }

  // Interviewer submits feedback
  async submitFeedback(
    interviewId: string,
    interviewerId: string,
    dto: SubmitInterviewFeedbackDto,
  ) {
    // Ensure interview exists & is active
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        isDeleted: false,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    // Ensure user is an interviewer for this interview
    const interviewer = await this.prisma.interviewInterviewer.findUnique({
      where: {
        interviewId_interviewerId: {
          interviewId,
          interviewerId,
        },
      },
    });

    if (!interviewer) {
      throw new ForbiddenException('You are not assigned to this interview');
    }

    return this.prisma.interviewFeedback.upsert({
      where: {
        interviewId_interviewerId: {
          interviewId,
          interviewerId,
        },
      },
      update: {
        score: dto.score,
        recommendation: dto.recommendation,
        notes: dto.notes,
      },
      create: {
        interviewId,
        interviewerId,
        score: dto.score,
        recommendation: dto.recommendation,
        notes: dto.notes,
      },
    });
  }

  // Candidate views interviews
  async getCandidateInterviews(candidateId: string) {
    return this.prisma.interview.findMany({
      where: {
        isDeleted: false,
        application: {
          userId: candidateId,
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
      include: {
        interviewers: {
          include: {
            interviewer: true,
          },
        },
      },
    });
  }

  // Recruiter views interviews for application
  async getApplicationInterviews(applicationId: string) {
    return this.prisma.interview.findMany({
      where: {
        applicationId,
        isDeleted: false,
      },
      orderBy: {
        round: 'asc',
      },
      include: {
        interviewers: {
          include: {
            interviewer: true,
          },
        },
        feedbacks: {
          include: {
            interviewer: true,
          },
        },
      },
    });
  }

  async getInterviewById(interviewId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        isDeleted: false,
      },
      include: {
        application: true,
        interviewers: {
          include: {
            interviewer: true,
          },
        },
        feedbacks: {
          include: {
            interviewer: true,
          },
        },
        createdBy: true,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }
  async deleteInterview(interviewId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        isDeleted: false,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return this.prisma.interview.update({
      where: { id: interviewId },
      data: {
        isDeleted: true,
      },
    });
  }
  async getAllInterviews() {
    return this.prisma.interview.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: [{ scheduledAt: 'desc' }, { round: 'asc' }],
      include: {
        application: true,
        interviewers: {
          include: {
            interviewer: true,
          },
        },
        feedbacks: {
          include: {
            interviewer: true,
          },
        },
        createdBy: true,
      },
    });
  }
}
