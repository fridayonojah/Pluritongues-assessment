import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dtos/level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    const data = await this.levelService.create(createLevelDto);
    return {
      status: true,
      message: 'Level created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.levelService.findAll();
    return {
      status: true,
      message: 'Level list',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.levelService.findOne(id);
    return {
      status: true,
      message: 'Level found',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.levelService.remove(id);
    return {
      status: true,
      message: 'Level deleted  successfully',
      data,
    };
  }
}
