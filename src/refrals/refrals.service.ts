import { Injectable } from '@nestjs/common';
import { CreateRefralDto } from './dto/create-refral.dto';
import { UpdateRefralDto } from './dto/update-refral.dto';

@Injectable()
export class RefralsService {
  create(createRefralDto: CreateRefralDto) {
    return 'This action adds a new refral';
  }

  findAll() {
    return `This action returns all refrals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refral`;
  }

  update(id: number, updateRefralDto: UpdateRefralDto) {
    return `This action updates a #${id} refral`;
  }

  remove(id: number) {
    return `This action removes a #${id} refral`;
  }
}
