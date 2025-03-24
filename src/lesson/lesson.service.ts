import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    try {
      const lesson = this.lessonRepository.create(createLessonDto);
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new InternalServerErrorException('Error creating lesson');
    }
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({ relations: ['level'] });
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['level'],
    });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.lessonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }
}
