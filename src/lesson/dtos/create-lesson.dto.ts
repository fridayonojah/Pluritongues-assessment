import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  lessonNumber: number;

  @IsNumber()
  exerciseCount: number;

  @IsString()
  goal: string;

  @IsBoolean()
  isCompleted: boolean;
}
