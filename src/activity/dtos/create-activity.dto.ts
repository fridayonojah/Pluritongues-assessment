import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  levelId: string;

  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @IsArray()
  lessons: any[];
}
