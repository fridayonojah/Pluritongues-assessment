import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Level } from '../../level/entities/level.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  levelId: string;

  @Column()
  lessonId: string;

  @Column()
  activityType: string; // VideoContentActivity | FillTheGapActivity

  @Column('text')
  instruction: string;

  @ManyToOne(() => Level, (level) => level.lessons, { onDelete: 'CASCADE' })
  level: Level;

  @ManyToOne(() => Lesson, (lesson) => lesson.activities, {
    onDelete: 'CASCADE',
  })
  lesson: Lesson;
}
