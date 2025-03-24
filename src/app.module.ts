import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { LessonModule } from './lesson/lesson.module';
import { LevelModule } from './level/level.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: process.env.DATABASE_SSL === 'true',
        },
      }),
    }),
    ActivityModule,
    LessonModule,
    LevelModule,
  ],
})
export class AppModule {}
