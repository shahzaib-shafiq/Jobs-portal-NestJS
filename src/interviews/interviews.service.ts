@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  // Recruiter schedules interview
  async scheduleInterview(recruiterId: string, dto: ScheduleInterviewDto) {
    return this.prisma.interview.create({
      data: {
        applicationId: dto.applicationId,
        type: dto.type,
        round: dto.round,
        status: 'SCHEDULED',
        scheduledAt: new Date(dto.scheduledAt),
        durationMin: dto.durationMin,
        meetingLink: dto.meetingLink,
        location: dto.location,
        createdById: recruiterId,
        interviewers: {
          create: dto.interviewerIds.map(id => ({
            interviewerId: id,
          })),
        },
      },
    });
  }

  // Interviewer submits feedback
  async submitFeedback(
    interviewId: string,
    interviewerId: string,
    dto: SubmitInterviewFeedbackDto,
  ) {
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
        application: {
          userId: candidateId,
        },
      },
      include: {
        interviewers: { include: { interviewer: true } },
      },
    });
  }

  // Recruiter views interviews for application
  async getApplicationInterviews(applicationId: string) {
    return this.prisma.interview.findMany({
      where: { applicationId },
      include: {
        interviewers: { include: { interviewer: true } },
        feedbacks: true,
      },
    });
  }
}
