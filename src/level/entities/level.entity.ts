import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from '../../lesson/entities/lesson.entity';

export enum Language {
  Igbo = 'Igbo',
  Yoruba = 'Yoruba',
}

@Entity()
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column()
  image: string;

  @Column()
  level: string;

  @Column({
    type: 'enum',
    enum: Language,
  })
  @Column({ default: 0 })
  completedLessons: number;

  @Column({ default: 0 })
  totalLessons: number;

  @OneToMany(() => Lesson, (lesson) => lesson.level)
  lessons: Lesson[];
}
