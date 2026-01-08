export interface Lesson {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint;
  phrases: Phrase[];
  quiz: QuizQuestion[];
}

export interface VocabularyItem {
  english: string;
  spanish: string;
  pronunciation: string;
  example: string;
  exampleEs: string;
}

export interface GrammarPoint {
  title: string;
  titleEs: string;
  explanation: string;
  examples: { english: string; spanish: string }[];
  tip: string;
}

export interface Phrase {
  english: string;
  spanish: string;
  context: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'translation' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Week {
  weekNumber: number;
  title: string;
  titleEs: string;
  theme: string;
  themeEs: string;
  icon: string;
  lessons: Lesson[];
  conversationTopics: string[];
}

export interface DailyRoutine {
  time: string;
  activity: string;
  activityEs: string;
  duration: string;
}

export interface UserProgress {
  currentWeek: number;
  currentDay: number;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; date: string }[];
  streak: number;
}
