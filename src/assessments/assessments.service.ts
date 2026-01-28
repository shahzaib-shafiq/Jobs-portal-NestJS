import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';

import { AssessmentSubmissionStatus } from '@prisma/client';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) {}

  // Recruiter creates assessment
  async createAssessment(userId: string, dto: CreateAssessmentDto) {
    return this.prisma.assessment.create({
      data: {
        title: dto.title,
        description: dto.description,
        createdById: userId,
        applicationId: dto.applicationId,
        questions: {
          create: dto.questions.map((q) => ({
            questionText: q.questionText,
            type: q.type,
            order: q.order,
          })),
        },
      },
      include: { questions: true },
    });
  }

  // Recruiter assigns assessment to candidate
  async assignAssessment(assessmentId: string, candidateId: string) {
    return this.prisma.assessmentSubmission.create({
      data: {
        assessmentId,
        candidateId,
      },
    });
  }

  // Candidate submits answers
  async submitAssessment(
    assessmentId: string,
    candidateId: string,
    dto: SubmitAssessmentDto,
  ) {
    const submission = await this.prisma.assessmentSubmission.findUnique({
      where: {
        assessmentId_candidateId: {
          assessmentId,
          candidateId,
        },
      },
      include: { assessment: true },
    });

    if (!submission) {
      throw new NotFoundException('Assessment not assigned');
    }

    if (submission.status === AssessmentSubmissionStatus.SUBMITTED) {
      throw new ForbiddenException('Assessment already submitted');
    }

    await this.prisma.assessmentAnswer.createMany({
      data: dto.answers.map((a) => ({
        submissionId: submission.id,
        questionId: a.questionId,
        textAnswer: a.textAnswer,
        booleanAnswer: a.booleanAnswer,
      })),
    });

    return this.prisma.assessmentSubmission.update({
      where: { id: submission.id },
      data: {
        status: AssessmentSubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // Candidate fetches own assessments
  async getMyAssessments(candidateId: string) {
    return this.prisma.assessmentSubmission.findMany({
      where: { candidateId },
      include: {
        assessment: {
          include: { questions: true },
        },
        answers: true,
      },
    });
  }

  // Recruiter views submissions
  async getAssessmentSubmissions(assessmentId: string, recruiterId: string) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment || assessment.createdById !== recruiterId) {
      throw new ForbiddenException();
    }

    return this.prisma.assessmentSubmission.findMany({
      where: { assessmentId },
      include: {
        candidate: true,
        answers: {
          include: { question: true },
        },
      },
    });
  }
}
