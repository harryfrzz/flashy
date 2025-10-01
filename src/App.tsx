import { useState } from 'react'
import InputBar from './components/input-bar'
import Topbar from './components/topbar'
import Welcome from './components/welcome-screen'
import AttachFile from './components/attach-files'
import FlashCard from './components/flash-card'
import ResultsScreen from './components/results-screen'
import { sampleFlashcards } from './data/flashcards'
import type { QuizResult, QuizSummary } from './types/flashcard'

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showFlashcards, setShowFlashcards] = useState(true)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [showResults, setShowResults] = useState(false)

  
  const togglePopup = () => setPopupOpen(!isPopupOpen)
  const closePopup = () => setPopupOpen(false)

  const handleAnswerSelected = (result: QuizResult) => {
    setQuizResults(prev => {
      const filtered = prev.filter(r => r.flashcardId !== result.flashcardId);
      return [...filtered, result];
    });
  }

  const handleNextCard = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // Quiz is complete, show results
      console.log('Quiz complete! Showing results...');
      setShowResults(true)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const getQuizSummary = (): QuizSummary => {
    const correctAnswers = quizResults.filter(r => r.isCorrect).length;
    const totalQuestions = sampleFlashcards.length;
    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      score: (correctAnswers / totalQuestions) * 100,
      results: quizResults
    };
  }

  const restartQuiz = () => {
    setCurrentCardIndex(0);
    setQuizResults([]);
    setShowResults(false);
    setShowFlashcards(true);
  }

  const backToHome = () => {
    setCurrentCardIndex(0);
    setQuizResults([]);
    setShowResults(false);
    setShowFlashcards(false);
  }

  const getExistingAnswer = (flashcardId: string): QuizResult | undefined => {
    return quizResults.find(result => result.flashcardId === flashcardId);
  }

  return (
    <div onClick={closePopup} className='w-[500px] h-[600px] relative bg-blue-100 overflow-hidden'>
      <Topbar/>

      <div className='w-full h-full p-5 flex overflow-scroll justify-start items-center flex-col gap-4'>
        {showResults ? (
          <ResultsScreen 
            summary={getQuizSummary()}
            flashcards={sampleFlashcards}
            onRestartQuiz={restartQuiz}
            onBackToHome={backToHome}
          />
        ) : showFlashcards ? (
          <FlashCard 
            flashcard={sampleFlashcards[currentCardIndex]}
            currentIndex={currentCardIndex}
            totalCards={sampleFlashcards.length}
            onNext={handleNextCard}
            onPrevious={handlePreviousCard}
            onAnswerSelected={handleAnswerSelected}
            existingAnswer={getExistingAnswer(sampleFlashcards[currentCardIndex].id)}
          />
        ) : (
          <Welcome/>
        )}
      </div>
      
      <AttachFile isOpen={isPopupOpen}/>
      <InputBar onOpenPopup={togglePopup}/>
    </div>
  )
}

export default App
