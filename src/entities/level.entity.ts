import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  image: string;

  @Column()
  level: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['Igbo', 'Yoruba'] })
  language: 'Igbo' | 'Yoruba';

  @Column({ default: 0 })
  completedLessons: number;

  @Column()
  totalLessons: number;

  @OneToMany(() => Lesson, (lesson) => lesson.level)
  lessons: Lesson[];
}
