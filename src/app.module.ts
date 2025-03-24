import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { LessonModule } from './lesson/lesson.module';
import { LevelModule } from './level/level.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: proccess.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ActivityModule,
    LessonModule,
    LevelModule,
  ],
})
export class AppModule {}
