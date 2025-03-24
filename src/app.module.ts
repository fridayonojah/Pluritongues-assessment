import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { LessonModule } from './lesson/lesson.module';
import { LevelModule } from './level/level.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://tongue_user:U0ZmCQIk1HgCXqjgJ7HNjovw8LGkxvCS@dpg-cvg9gpdrie7s73bnhpc0-a.oregon-postgres.render.com/tongue',
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
