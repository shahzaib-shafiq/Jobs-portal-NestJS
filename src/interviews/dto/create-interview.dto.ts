export class ScheduleInterviewDto {
    applicationId: string;
    type: InterviewType;
    round: number;
    scheduledAt: string;
    durationMin?: number;
    meetingLink?: string;
    location?: string;
    interviewerIds: string[];
  }
  export class SubmitInterviewFeedbackDto {
    score?: number;
    recommendation: InterviewRecommendation;
    notes?: string;
  }
  