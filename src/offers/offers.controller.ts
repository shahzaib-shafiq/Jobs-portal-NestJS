import { Controller, Get,Req, Post, Body, Patch, Param, UseGuards ,Delete} from '@nestjs/common';
import { OfferService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { SendOfferDto } from './dto/send-offer.dto';
import { RespondOfferDto } from './dto/respond-offer.dto';
@Controller('offer')
@UseGuards(JwtAuthGuard,RolesGuard)
export class OfferController {
  constructor(private service: OfferService) {}
  @Roles('recruiter','admin')
  // Recruiter creates offer
  @Post()
  create(@Req() req, @Body() dto: CreateOfferDto) {
    return this.service.createOffer(req.user.userId, dto);
  }

  @Roles('recruiter','admin')
  // Recruiter sends offer
  @Post(':offerId/send')
  send(
    @Req() req,
    @Param('offerId') offerId: string,
    @Body() dto: SendOfferDto,
  ) {
    return this.service.sendOffer(offerId, req.user.userId, dto.message);
  }

  @Roles('candidate')
  // Candidate responds
  @Post(':offerId/respond')
  respond(
    @Req() req,
    @Param('offerId') offerId: string,
    @Body() dto: RespondOfferDto,
  ) {
    return this.service.respondOffer(
      offerId,
      req.user.userId,
      dto.action,
      dto.notes,
    );
  }

  @Roles('candidate')
  // Candidate views offer
  @Get('me')
  myOffer(@Req() req) {
    return this.service.getMyOffer(req.user.userId);
  }

  @Roles('recruiter','admin')
  // Recruiter views offer
  @Get(':offerId')
  get(@Param('offerId') offerId: string) {
    return this.service.getOffer(offerId);
  }

  @Get()
  getAll() {
    return this.service.getAllOffers();
  }
  @Delete(':offerId')
  delete(@Param('offerId') offerId: string) {
    return this.service.deleteOffer(offerId);
  }
}
