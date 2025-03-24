import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from '../activity/dtos/create-activity.dto';
import { Activity } from './entities/activity.entity';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    const data = await this.activityService.create(createActivityDto);
    return {
      status: true,
      message: 'Activitie created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.activityService.findAll();
    return {
      status: true,
      message: 'List activities',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.activityService.findOne(id);
    return {
      status: true,
      message: 'Activitie found',
      data,
    };
  }
}
