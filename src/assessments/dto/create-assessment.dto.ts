import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsEnum,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@prisma/client';

export class CreateAssessmentQuestionDto {
  @IsString()
  questionText: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsInt()
  order: number;
}

export class CreateAssessmentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  applicationId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssessmentQuestionDto)
  questions: CreateAssessmentQuestionDto[];
}
