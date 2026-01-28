import { IsUUID, IsOptional, IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitAssessmentAnswerDto {
  @IsUUID()
  questionId: string;

  @IsOptional()
  @IsString()
  textAnswer?: string;

  @IsOptional()
  @IsBoolean()
  booleanAnswer?: boolean;
}

export class SubmitAssessmentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAssessmentAnswerDto)
  answers: SubmitAssessmentAnswerDto[];
}
