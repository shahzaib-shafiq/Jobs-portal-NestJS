import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefralsService } from './refrals.service';
import { CreateRefralDto } from './dto/create-refral.dto';
import { UpdateRefralDto } from './dto/update-refral.dto';

@Controller('refrals')
export class RefralsController {
  constructor(private readonly refralsService: RefralsService) {}

  @Post()
  create(@Body() createRefralDto: CreateRefralDto) {
    return this.refralsService.create(createRefralDto);
  }

  @Get()
  findAll() {
    return this.refralsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refralsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefralDto: UpdateRefralDto) {
    return this.refralsService.update(+id, updateRefralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refralsService.remove(+id);
  }
}
