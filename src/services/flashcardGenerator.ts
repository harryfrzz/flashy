import type { Flashcard } from '../types/flashcard';

export interface FlashcardGenerationOptions {
  maxCards?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionTypes?: ('multiple-choice' | 'true-false' | 'fill-blank')[];
}

export interface FlashcardGenerationResult {
  flashcards: Flashcard[];
  sourceText: string;
  processingTime: number;
  error?: string;
}

export class FlashcardGenerator {
  private static readonly DEFAULT_OPTIONS: Required<FlashcardGenerationOptions> = {
    maxCards: 10,
    difficulty: 'medium',
    questionTypes: ['multiple-choice']
  };

  static async generateFromText(
    text: string, 
    options: FlashcardGenerationOptions = {}
  ): Promise<FlashcardGenerationResult> {
    const startTime = Date.now();
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    const result: FlashcardGenerationResult = {
      flashcards: [],
      sourceText: text,
      processingTime: 0
    };

    try {
      if (!text.trim()) {
        throw new Error('No text provided for flashcard generation');
      }

      // For now, we'll use a simple rule-based approach
      // In the future, this would be replaced with AI generation
      result.flashcards = await this.generateWithSimpleRules(text, opts);
      
      if (result.flashcards.length === 0) {
        throw new Error('Could not generate any flashcards from the provided text. Text might be too short or lack suitable content.');
      }

    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown error occurred';
    }

    result.processingTime = Date.now() - startTime;
    return result;
  }

  private static async generateWithSimpleRules(
    text: string, 
    options: Required<FlashcardGenerationOptions>
  ): Promise<Flashcard[]> {
    const flashcards: Flashcard[] = [];
    
    // Split text into sentences
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 150); // Filter reasonable length sentences for better UI

    // Extract key concepts (simple keyword extraction)
    const concepts = this.extractKeyConcepts(text);
    
    let cardCount = 0;
    const maxCards = Math.min(options.maxCards, sentences.length, concepts.length);

    // Generate fill-in-the-blank questions from sentences
    for (let i = 0; i < sentences.length && cardCount < maxCards; i++) {
      const sentence = sentences[i];
      const concept = concepts[cardCount % concepts.length];
      
      if (sentence.toLowerCase().includes(concept.toLowerCase())) {
        const flashcard = this.createFillBlankQuestion(sentence, concept, cardCount);
        if (flashcard) {
          flashcards.push(flashcard);
          cardCount++;
        }
      }
    }

    // If we don't have enough cards, generate some definition-style questions
    while (cardCount < maxCards && cardCount < concepts.length) {
      const concept = concepts[cardCount];
      const flashcard = this.createDefinitionQuestion(text, concept, cardCount);
      if (flashcard) {
        flashcards.push(flashcard);
        cardCount++;
      }
    }

    return flashcards;
  }

  private static extractKeyConcepts(text: string): string[] {
    // Simple keyword extraction - look for capitalized words and important terms
    const words = text.split(/\s+/);
    const concepts: Set<string> = new Set();

    for (const word of words) {
      // Remove punctuation
      const cleaned = word.replace(/[^\w]/g, '');
      
      // Add capitalized words (potential proper nouns/concepts)
      if (cleaned.length > 3 && /^[A-Z]/.test(cleaned)) {
        concepts.add(cleaned);
      }
      
      // Add longer words that might be important
      if (cleaned.length > 6) {
        concepts.add(cleaned);
      }
    }

    return Array.from(concepts).slice(0, 20); // Limit to 20 concepts
  }

  private static createFillBlankQuestion(sentence: string, concept: string, index: number): Flashcard | null {
    const conceptRegex = new RegExp(`\\b${concept}\\b`, 'gi');
    const matches = sentence.match(conceptRegex);
    
    if (!matches) return null;

    const question = sentence.replace(conceptRegex, '_____');
    const correctAnswer = matches[0]; // Use the actual case from the text
    
    // Generate distractors (wrong options)
    const distractors = this.generateDistractors(correctAnswer);
    
    const options = [
      { id: 'a', text: correctAnswer, isCorrect: true },
      { id: 'b', text: distractors[0], isCorrect: false },
      { id: 'c', text: distractors[1], isCorrect: false },
      { id: 'd', text: distractors[2], isCorrect: false }
    ];

    // Shuffle options
    this.shuffleArray(options);

    return {
      id: `generated-${index + 1}`,
      question: question.length > 100 ? `Fill in the blank: ${question.substring(0, 100)}...` : `Fill in the blank: ${question}`,
      options,
      explanation: `The correct answer is "${correctAnswer}" as mentioned in the source text.`
    };
  }

  private static createDefinitionQuestion(text: string, concept: string, index: number): Flashcard | null {
    // Find sentences that contain the concept
    const sentences = text.split(/[.!?]+/).filter(s => 
      s.toLowerCase().includes(concept.toLowerCase()) && s.trim().length > 20
    );

    if (sentences.length === 0) return null;

    const contextSentence = sentences[0].trim();
    const distractors = this.generateDistractors(concept);

    const options = [
      { id: 'a', text: concept, isCorrect: true },
      { id: 'b', text: distractors[0], isCorrect: false },
      { id: 'c', text: distractors[1], isCorrect: false },
      { id: 'd', text: distractors[2], isCorrect: false }
    ];

    this.shuffleArray(options);

    return {
      id: `generated-${index + 1}`,
      question: `Based on the text, what key term is being described: "${contextSentence.substring(0, 80)}${contextSentence.length > 80 ? '...' : ''}"`,
      options,
      explanation: `The term "${concept}" appears in this context within the source material.`
    };
  }

  private static generateDistractors(correctAnswer: string): string[] {
    // Simple distractor generation - in a real implementation, this would be more sophisticated
    const commonDistractors = [
      'Information', 'Data', 'System', 'Process', 'Method', 'Technology', 
      'Solution', 'Application', 'Service', 'Platform', 'Network', 'Database',
      'Analysis', 'Research', 'Study', 'Report', 'Document', 'Content'
    ];

    const distractors = commonDistractors
      .filter(d => d.toLowerCase() !== correctAnswer.toLowerCase())
      .slice(0, 3);

    // If we don't have enough distractors, generate some variations
    while (distractors.length < 3) {
      const variations = [
        correctAnswer + ' System',
        'Advanced ' + correctAnswer,
        correctAnswer + ' Method'
      ];
      
      for (const variation of variations) {
        if (distractors.length < 3 && !distractors.includes(variation)) {
          distractors.push(variation);
        }
      }

      if (distractors.length < 3) {
        distractors.push(`Option ${distractors.length + 1}`);
      }
    }

    return distractors;
  }

  private static shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Future: Method for AI-based generation
  static async generateWithAI(): Promise<FlashcardGenerationResult> {
    // This would integrate with Gemini Nano or other AI services
    throw new Error('AI-based generation not yet implemented. Using simple rule-based generation instead.');
  }
}