// Created an enum for the language so that languages can be easily added in the future.
enum Language {
  Igbo = 'Igbo',
  Yoruba = 'Yoruba',
}

// Created an enum type for the activity type instead of having them hardcoded inside the interfaces.
enum ActivityType {
  VideoContent = 'VideoContentActivity',
  FillTheGap = 'FillTheGapActivity',
}

// Since the id is common across the interfaces, we can create a base interface that other interfaces can extend.
interface BaseEntity {
  id: string;
}

interface Level extends BaseEntity {
  icon: string;
  image: string;
  level: string;
  title: string;
  description: string;
  language: Language;
  completedLessons: number;
  totalLessons: number;
}

interface Lesson extends BaseEntity {
  title: string;
  description: string;
  lessonNumber: number;
  exerciseCount: number;
  goal: string;
  points: string[];
  isCompleted: boolean;
}

interface Activities extends BaseEntity {
  level: string;
  lesson: string;
  lessons: Question[];
}

type Question = FillTheGapQuestion | VideoContentQuestion;

interface VideoContentQuestion {
  instruction: string;
  question: {
    videoUrl: string;
  };
  activityType: ActivityType.VideoContent;
  options: VideoContentOption[];
  answer: string;
}

interface VideoContentOption {
  id: string;
  text: string;
  audioUrl?: string; // Make this optional since it might not always be provided.
}

interface FillTheGapQuestion {
  instruction: string;
  activityType: ActivityType.FillTheGap;
  imageUrl?: string;
  audioUrl?: string;
  question: string;
  options: FillTheGapLessonOption[];
  answer: string[];
}

interface FillTheGapLessonOption {
  id: string;
  text: string;
  audioUrl?: string; // Make this optional since it might not always be provided.
}
