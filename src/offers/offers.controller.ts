import { Controller, Get,Req, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
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
@Roles('recruiter','admin')
export class OfferController {
  constructor(private service: OfferService) {}

  // Recruiter creates offer
  @Post()
  create(@Req() req, @Body() dto: CreateOfferDto) {
    return this.service.createOffer(req.user.userId, dto);
  }

  // Recruiter sends offer
  @Post(':offerId/send')
  send(
    @Req() req,
    @Param('offerId') offerId: string,
    @Body() dto: SendOfferDto,
  ) {
    return this.service.sendOffer(offerId, req.user.userId, dto.message);
  }

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

  // Candidate views offer
  @Get('me')
  myOffer(@Req() req) {
    return this.service.getMyOffer(req.user.userId);
  }

  // Recruiter views offer
  @Get(':offerId')
  get(@Param('offerId') offerId: string) {
    return this.service.getOffer(offerId);
  }
}
