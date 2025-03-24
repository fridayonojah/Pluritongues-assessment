import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsEnum(['Igbo', 'Yoruba', 'English'])
  language: 'Igbo' | 'Yoruba' | 'English';
}
