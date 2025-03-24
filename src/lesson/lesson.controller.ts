import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    const data = await this.lessonService.create(createLessonDto);
    return {
      status: true,
      message: 'Lesson created successfully!',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.lessonService.findAll();
    return {
      status: true,
      message: 'All lessons',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.lessonService.findOne(id);
    return {
      status: true,
      message: 'Lesson found',
      data,
    };
  }
}
