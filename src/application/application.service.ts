import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService, private notificationService: NotificationService) { }

  // ✅ Create Application (Users can apply to many jobs)
  async create(createApplicationDto: CreateApplicationDto) {
    // Check if user has already applied to this job
    const existingApplication = await this.prisma.application.findFirst({
      where: {
        userId: createApplicationDto.userId,
        jobId: createApplicationDto.jobId,
        isDeleted: false,
      },
    });

    if (existingApplication) {
      throw new ConflictException(
        `User has already applied to this job. Application ID: ${existingApplication.id}`,
      );
    }

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createApplicationDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createApplicationDto.userId} not found`,
      );
    }

    // Verify job exists
    const job = await this.prisma.job.findUnique({
      where: { id: createApplicationDto.jobId },
    });

    if (!job) {
      throw new NotFoundException(
        `Job with ID ${createApplicationDto.jobId} not found`,
      );
    }

    return this.prisma.application.create({
      data: {
        ...createApplicationDto,
      },
      include: {
        user: true,
        job: true,
      },
    });
  }

  // ✅ Get All Applications
  async findAll() {
    return this.prisma.application.findMany({
      include: {
        job: true,
        user: true,
      },
    });
  }

  // ✅ Get Single Application by ID
  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        user: true,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  // ✅ Update Application
  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return this.prisma.application.update({
      where: { id },
      data: {
        ...updateApplicationDto,
      },
    });
  }

  // ✅ Delete Application
  async remove(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return this.prisma.application.delete({
      where: { id },
    });
  }

  // ✅ Get all applications by a user (Proves: one user can apply to many jobs)
  async findByUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.application.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ✅ Get all applications for a job (Proves: many users can apply to one job)
  async findByJob(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    return this.prisma.application.findMany({
      where: {
        jobId,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileSummary: true,
            resumeUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ✅ Check if user has applied to a specific job
  async hasUserApplied(userId: string, jobId: string): Promise<boolean> {
    const application = await this.prisma.application.findFirst({
      where: {
        userId,
        jobId,
        isDeleted: false,
      },
    });

    return !!application;
  }

  async getUserApplications(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

async sendReminderToRecruiter(
  applicationId: string,
  candidateId: string,
) {
  const application = await this.prisma.application.findFirst({
    where: {
      id: applicationId,
      isDeleted: false,
    },
    include: {
      job: true,
      user: true,
    },
  });

  if (!application) {
    throw new NotFoundException('Application not found');
  }

  // ✅ Ownership check
  if (application.userId !== candidateId) {
    throw new ForbiddenException('You cannot remind for this application');
  }

  // ✅ Status guard
  if (['REJECTED', 'HIRED'].includes(application.status)) {
    throw new BadRequestException(
      'Cannot send reminder for this application status',
    );
  }
  // ✅ Create notification for recruiter
  const recruiterId = application.job.createdById;

if (!recruiterId) {
  throw new BadRequestException(
    'Cannot send reminder: job creator not found',
  );
}

await this.notificationService.create({
  userId: recruiterId,
  message: `Reminder: ${application.user.firstName} followed up on "${application.job.title}"`,
});
  // (Optional) track reminder time
  await this.prisma.application.update({
    where: { id: applicationId },
    data: {
      lastReminderAt: new Date(),
    },
  });

  return {
    message: 'Reminder sent successfully',
  };
}


}
