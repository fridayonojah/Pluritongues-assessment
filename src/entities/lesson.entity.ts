import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  lessonNumber: number;

  @Column()
  exerciseCount: number;

  @Column()
  goal: string;

  @Column('text', { array: true })
  points: string[];

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Level, (level) => level.lessons)
  level: Level;
}
