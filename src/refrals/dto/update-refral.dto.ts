import { PartialType } from '@nestjs/mapped-types';
import { CreateRefralDto } from './create-refral.dto';

export class UpdateRefralDto extends PartialType(CreateRefralDto) {}
