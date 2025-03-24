import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Level } from '../../level/entities/level.entity';
import { Activity } from 'src/activity/entities/activity.entity';

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

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Level, (level) => level.lessons, { onDelete: 'CASCADE' })
  level: Level;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Activity, (activity) => activity.lesson)
  activities: Activity[];
}
