import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import { ScoreAssessmentDto } from './dto/score-assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
@Controller('assessments')
@UseGuards(JwtAuthGuard,RolesGuard)
@UseGuards(JwtAuthGuard)
export class AssessmentsController {
  constructor(private service: AssessmentsService) {}

  // Recruiter creates assessment
  @Roles('recruiter','admin')
  @Post()
  create(@Req() req, @Body() dto: CreateAssessmentDto) {
    return this.service.createAssessment(req.user.userId, dto);
  }

  @Roles('recruiter','admin')
  // Recruiter assigns assessment to candidate
  @Post(':assessmentId/assign/:candidateId')
  assign(
    @Param('assessmentId') assessmentId: string,
    @Param('candidateId') candidateId: string,
  ) {
    return this.service.assignAssessment(assessmentId, candidateId);
  }

  @Roles('candidate')
  // Candidate submits assessment
  @Post(':assessmentId/submit')
  submit(
    @Req() req,
    @Param('assessmentId') assessmentId: string,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.service.submitAssessment(assessmentId, req.user.userId, dto);
  }

  @Roles('candidate')
  // Candidate views own assessments
  @Get('me')
  myAssessments(@Req() req) {
    return this.service.getMyAssessments(req.user.userId);
  }

  @Roles('recruiter','admin')
  // Recruiter views submissions
  @Get(':assessmentId/submissions')
  submissions(@Req() req, @Param('assessmentId') assessmentId: string) {
    return this.service.getAssessmentSubmissions(assessmentId, req.user.userId);
  }
  @Roles('recruiter','admin')
  @Post(':assessmentId/score/:candidateId')
  score(
    @Req() req,
    @Param('assessmentId') assessmentId: string,
    @Param('candidateId') candidateId: string,
    @Body() dto: ScoreAssessmentDto,
  ) {
    return this.service.scoreSubmission(
      assessmentId,
      candidateId,
      req.user.userId,
      dto,
    );
  }

  @Roles('recruiter','admin','candidate')
  @Get(':assessmentId/result')
  getResult(@Req() req, @Param('assessmentId') assessmentId: string) {
    return this.service.getAssessmentResult(assessmentId, req.user.userId);
  }
}
