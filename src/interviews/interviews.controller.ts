import {
  Controller,
  Get,
  Delete,
  Post,
  Req,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterviewService } from './interviews.service';
import {
  ScheduleInterviewDto,
  SubmitInterviewFeedbackDto,
} from './dto/create-interview.dto';

import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('interviews')
export class InterviewController {
  constructor(private service: InterviewService) {}

  @Roles('recruiter', 'admin')
  @Get(':interviewId')
  getById(@Param('interviewId') interviewId: string) {
    return this.service.getInterviewById(interviewId);
  }

  @Roles('recruiter', 'admin')
  @Delete(':interviewId')
  delete(@Param('interviewId') interviewId: string) {
    return this.service.deleteInterview(interviewId);
  }

  @Roles('recruiter', 'admin')
  @Get()
  getAll() {
    return this.service.getAllInterviews();
  }

  // Recruiter schedules interview
  @Roles('recruiter', 'admin')
  @Post()
  schedule(@Req() req, @Body() dto: ScheduleInterviewDto) {
    return this.service.scheduleInterview(req.user.userId, dto);
  }

  // Interviewer submits feedback
  @Roles('recruiter', 'admin')
  @Post(':interviewId/feedback')
  submitFeedback(
    @Req() req,
    @Param('interviewId') interviewId: string,
    @Body() dto: SubmitInterviewFeedbackDto,
  ) {
    return this.service.submitFeedback(interviewId, req.user.userId, dto);
  }

  // Candidate views interviews
  @Roles('candidate', 'admin')
  @Get('me')
  myInterviews(@Req() req) {
    return this.service.getCandidateInterviews(req.user.userId);
  }

  // Recruiter views interviews for application
  @Roles('recruiter', 'admin')
  @Get('application/:applicationId')
  getByApplication(@Param('applicationId') applicationId: string) {
    return this.service.getApplicationInterviews(applicationId);
  }
}
