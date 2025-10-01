interface FlashcardOption {
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
export const sampleFlashcards: Flashcard[] = [
  {
    id: '1',
    question: 'What is the largest lake in India?',
    options: [
      { id: 'a', text: 'Chilika Lake', isCorrect: false },
      { id: 'b', text: 'Vembanad Lake', isCorrect: false },
      { id: 'c', text: 'Wular Lake', isCorrect: true },
      { id: 'd', text: 'Dal Lake', isCorrect: false }
    ],
    explanation: 'Wular Lake in Jammu and Kashmir is the largest freshwater lake in India, covering an area of about 189 square kilometers.'
  },
  {
    id: '2',
    question: 'Which is the capital of Australia?',
    options: [
      { id: 'a', text: 'Sydney', isCorrect: false },
      { id: 'b', text: 'Melbourne', isCorrect: false },
      { id: 'c', text: 'Canberra', isCorrect: true },
      { id: 'd', text: 'Perth', isCorrect: false }
    ],
    explanation: 'Canberra is the capital city of Australia. Many people think it\'s Sydney or Melbourne because they are larger cities, but Canberra was specifically designed as the capital.'
  },
  {
    id: '3',
    question: 'What is the chemical symbol for gold?',
    options: [
      { id: 'a', text: 'Go', isCorrect: false },
      { id: 'b', text: 'Au', isCorrect: true },
      { id: 'c', text: 'Gd', isCorrect: false },
      { id: 'd', text: 'Ag', isCorrect: false }
    ],
    explanation: 'The chemical symbol for gold is Au, which comes from the Latin word "aurum" meaning gold. Ag is silver, Gd is gadolinium.'
  }
];