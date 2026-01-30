import { Injectable ,ForbiddenException,NotFoundException} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  // Recruiter creates offer
  async createOffer(recruiterId: string, dto: CreateOfferDto) {
    const application = await this.prisma.application.findUnique({
      where: { id: dto.applicationId },
    });
  
    if (!application) {
      throw new NotFoundException('Application not found');
    }
  
    return this.prisma.offer.create({
      data: {
        applicationId: dto.applicationId,
        title: dto.title,
        employmentType: dto.employmentType,
        baseSalary: dto.baseSalary,
        bonus: dto.bonus,
        equity: dto.equity,
        currency: dto.currency,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        location: dto.location,
        notes: dto.notes,
  
        // ✅ now guaranteed string
        candidateId: application.userId,
        createdById: recruiterId,
  
        histories: {
          create: {
            action: 'CREATED',
            createdById: recruiterId,
          },
        },
      },
    });
  }
  
  // Recruiter sends offer
  async sendOffer(offerId: string, recruiterId: string, message?: string) {
    return this.prisma.offer.update({
      where: { id: offerId },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        histories: {
          create: {
            action: 'SENT',
            notes: message,
            createdById: recruiterId,
          },
        },
      },
    });
  }

  // Candidate responds
  async respondOffer(
    offerId: string,
    candidateId: string,
    action: 'ACCEPTED' | 'REJECTED',
    notes?: string,
  ) {
    const offer = await this.prisma.offer.findUnique({ where: { id: offerId } });

    if (offer && offer.candidateId !== candidateId) {
      throw new ForbiddenException();
    }

    return this.prisma.offer.update({
      where: { id: offerId },
      data: {
        status: action,
        respondedAt: new Date(),
        histories: {
          create: {
            action,
            notes,
            createdById: candidateId,
          },
        },
      },
    });
  }

  // Candidate views own offer
  async getMyOffer(candidateId: string) {
    return this.prisma.offer.findMany({
      where: { candidateId },
      include: { histories: true },
    });
  }

  // Recruiter views offer
  async getOffer(offerId: string) {
    return this.prisma.offer.findUnique({
      where: { id: offerId },
      include: { histories: true },
    });
  }

  async deleteOffer(offerId: string) {
    return this.prisma.offer.update({
      where: { id: offerId },
      data: { isDeleted: true },
      include: { histories: true },
    });
  }

  async getAllOffers() {
    return this.prisma.offer.findMany({
      include: { histories: true },
      where: { isDeleted: false },
    });
  }
}
