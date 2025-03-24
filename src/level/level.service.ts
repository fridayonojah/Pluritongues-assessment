import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dtos/level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = this.levelRepository.create(createLevelDto);
    return this.levelRepository.save(level);
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find({ relations: ['lessons'] });
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  async remove(id: string): Promise<void> {
    await this.levelRepository.delete(id);
  }
}
