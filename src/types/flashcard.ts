export interface FlashcardOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  options: FlashcardOption[];
  explanation: string;
}

export interface SelectedAnswer {
  optionId: string;
  isCorrect: boolean;
}

export interface QuizResult {
  flashcardId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface QuizSummary {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number; // percentage
  results: QuizResult[];
}