interface BaseEntity {
  id: string;
  title: string;
  description: string;
}

interface Point {
  id: string;
  value: number;
}

// Use an Enum for Languages
// Improvement: Define an enum for languages and use it throughout your interfaces. This enhances clarity and maintains consistency.
enum LanguageCode {
  Igbo = 'Igbo',
  Yoruba = 'Yoruba',
  English = 'English',
}

enum ActivityType {
  VideoContentActivity = 'VideoContentActivity',
  FillTheGapActivity = 'FillTheGapActivity',
}

interface BaseQuestion {
  instruction: string;
  activityType: ActivityType;
}

interface Level extends BaseEntity {
  icon: string;
  image: string;
  level: string;
  title: string;
  description: string;
  language: LanguageCode;
  completedLessons: number;
  totalLessons: number;
  createdAt: Date; // New field
  updatedAt: Date; // New field
}

interface Lesson extends BaseEntity {
  lessonNumber: number;
  exerciseCount: number;
  goal: string;
  isCompleted: boolean;
  points: Point[];
}

interface Activities {
  id: string;
  levelId: string; // Use a specific type or reference
  lessonId: string; // Use a specific type or reference
  lessons: Question[];
}

type Question = FillTheGapQuestion | VideoContentQuestion;

interface VideoContentQuestion extends BaseQuestion {
  question: {
    videoUrl: string;
  };
  options: Option[];
  answer: string;
}

interface Option {
  id: string;
  text: string;
  audioUrl: string;
}

interface FillTheGapQuestion extends BaseQuestion {
  question: string;
  imageUrl?: string;
  audioUrl?: string;
  options: Option[]; // Unified options interface
  answer: string[];
}
