import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLevelDto } from './dtos/create-level.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Create a new level record
   * @param createLevelDto
   * @returns
   */
  @Post('levels')
  createLevel(@Body() createLevelDto: CreateLevelDto) {
    const data = this.appService.createLevel(createLevelDto);
    return {
      status: true,
      message: 'Level was created succesfully',
      data,
    };
  }

  /***
   * Retrieve all the levels record
   */
  @Get('levels')
  getAllLevels() {
    const data = this.appService.getAllLevels();
    return {
      status: true,
      message: 'All levels',
      data,
    };
  }

  /**
   * Get a particular level by an id
   * @param id
   * @returns
   */
  @Get('levels/:id')
  async getLevel(@Param('id') id: string) {
    const data = await this.appService.getLevel(id);
    return {
      status: true,
      message: 'Record found',
      data,
    };
  }
}
