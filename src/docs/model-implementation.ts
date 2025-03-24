import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// Enum for language
export enum Language {
  Igbo = 'Igbo',
  Yoruba = 'Yoruba',
}

// Base entity to include common properties
@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity()
export class Level extends BaseEntity {
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

  @Column({
    type: 'enum',
    enum: Language,
  })
  language: Language;

  @Column()
  completedLessons: number;

  @Column()
  totalLessons: number;

  @OneToMany(() => Lesson, (lesson) => lesson.level)
  lessons: Lesson[];
}

@Entity()
export class Lesson extends BaseEntity {
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

  @OneToMany(() => Activities, (activities) => activities.lesson)
  activities: Activities[];
}

@Entity()
export class Activities extends BaseEntity {
  @ManyToOne(() => Level, (level) => level.lessons)
  level: Level;

  @ManyToOne(() => Lesson, (lesson) => lesson.activities)
  lesson: Lesson;

  @OneToMany(() => Question, (question) => question.activities)
  questions: Question[];
}

// Base Question interface with common properties
@Entity()
export abstract class Question extends BaseEntity {
  @Column()
  instruction: string;

  @Column()
  activityType: string;

  @Column()
  answer: string;

  @OneToMany(() => Activities, (activities) => activities.lesson)
  activities: Activities[];
}

@Entity()
export class VideoContentQuestion extends Question {
  @Column({ type: 'text' })
  videoUrl: string;

  @OneToMany(() => VideoContentOption, (option) => option.question)
  options: VideoContentOption[];
}

@Entity()
export class VideoContentOption extends BaseEntity {
  @Column()
  text: string;

  @Column({ nullable: true })
  audioUrl?: string;

  @ManyToOne(() => VideoContentQuestion, (question) => question.options)
  question: VideoContentQuestion;
}

@Entity()
export class FillTheGapQuestion extends Question {
  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  audioUrl?: string;

  @Column('text', { array: true })
  options: string[];
}
