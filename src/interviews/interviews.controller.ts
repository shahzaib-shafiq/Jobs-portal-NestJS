@Controller('interviews')
@UseGuards(AuthGuard('jwt'))
export class InterviewController {
  constructor(private service: InterviewService) {}

  // Recruiter schedules interview
  @Post()
  schedule(@Req() req, @Body() dto: ScheduleInterviewDto) {
    return this.service.scheduleInterview(req.user.userId, dto);
  }

  // Interviewer submits feedback
  @Post(':interviewId/feedback')
  submitFeedback(
    @Req() req,
    @Param('interviewId') interviewId: string,
    @Body() dto: SubmitInterviewFeedbackDto,
  ) {
    return this.service.submitFeedback(
      interviewId,
      req.user.userId,
      dto,
    );
  }

  // Candidate views interviews
  @Get('me')
  myInterviews(@Req() req) {
    return this.service.getCandidateInterviews(req.user.userId);
  }

  // Recruiter views interviews for application
  @Get('application/:applicationId')
  getByApplication(@Param('applicationId') applicationId: string) {
    return this.service.getApplicationInterviews(applicationId);
  }
}
