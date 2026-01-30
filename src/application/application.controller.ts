import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recruiter', 'admin','candidate')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto, @Req() req) {
    return this.applicationService.create(createApplicationDto, req.user.userId as string);
  }

  @Get()
  findAll(@Query('userId') userId?: string, @Query('jobId') jobId?: string) {
    // If userId is provided, get all applications by user
    if (userId) {
      return this.applicationService.findByUser(userId);
    }
    // If jobId is provided, get all applications for job
    if (jobId) {
      return this.applicationService.findByJob(jobId);
    }
    // Otherwise, get all applications
    return this.applicationService.findAll();
  }

  // ✅ Specific routes must come before the generic :id route
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.applicationService.findByUser(userId);
  }

  @Get('job/:jobId')
  findByJob(@Param('jobId') jobId: string) {
    return this.applicationService.findByJob(jobId);
  }

  @Get('check/:userId/:jobId')
  hasUserApplied(
    @Param('userId') userId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.applicationService.hasUserApplied(userId, jobId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }

  @Get('user-applications/:userId')
  getUserApplications(@Param('userId') userId: string) {
    return this.applicationService.getUserApplications(userId);
  }

  @Post(':applicationId/remind')
  async remindRecruiter(
    @Param('applicationId') applicationId: string,
    @Req() req,
  ) {
    return this.applicationService.sendReminderToRecruiter(
      applicationId,
      req.user.userId,
    );
  }
}
