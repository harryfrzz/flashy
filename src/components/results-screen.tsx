import type { QuizSummary, Flashcard } from "../types/flashcard";

interface ResultsScreenProps {
    summary: QuizSummary;
    flashcards: Flashcard[];
    onRestartQuiz: () => void;
    onBackToHome: () => void;
}

export default function ResultsScreen({ 
    summary, 
    flashcards, 
    onRestartQuiz, 
    onBackToHome 
}: ResultsScreenProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Excellent! 🎉';
        if (score >= 80) return 'Great job! 👏';
        if (score >= 70) return 'Good work! 👍';
        if (score >= 60) return 'Keep practicing! 📚';
        return 'Need more study! 💪';
    };

    return (
        <div className="w-full bg-blue-200 rounded-2xl mt-16 px-5 py-4 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Header Section - Fixed */}
            <div className="text-center mb-4 flex-shrink-0">
                <h1 className="text-2xl font-bold mb-2">Quiz Complete!</h1>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(summary.score)}`}>
                    {Math.round(summary.score)}%
                </div>
                <p className="text-base font-semibold mb-3">{getScoreMessage(summary.score)}</p>
            </div>
            
            {/* Action Buttons - Fixed */}
            <div className="flex gap-3 mb-4 flex-shrink-0">
                <button
                    onClick={onRestartQuiz}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Try Again
                </button>
                <button
                    onClick={onBackToHome}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Back to Home
                </button>
            </div>
            
            {/* Summary Section - Fixed */}
            <div className="bg-blue-100 rounded-lg p-4 mb-4 flex-shrink-0">
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-lg p-3">
                        <div className="text-xl font-bold text-blue-600">{summary.totalQuestions}</div>
                        <div className="text-xs text-gray-600">Total</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <div className="text-xl font-bold text-green-600">{summary.correctAnswers}</div>
                        <div className="text-xs text-gray-600">Correct</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <div className="text-xl font-bold text-red-600">{summary.incorrectAnswers}</div>
                        <div className="text-xs text-gray-600">Wrong</div>
                    </div>
                </div>
            </div>

            {/* Question Results - Scrollable */}
            <div className="bg-blue-100 rounded-lg p-4 flex-1 min-h-0">
                <h2 className="text-lg font-semibold mb-3">Question Results</h2>
                <div className="overflow-y-auto max-h-48">
                    {summary.results.map((result, index) => {
                        const flashcard = flashcards.find(f => f.id === result.flashcardId);
                        return (
                            <div key={result.flashcardId} className="flex items-start justify-between py-2 border-b border-blue-200 last:border-b-0 gap-3">
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium">Q{index + 1}: </span>
                                    <span className="text-sm break-words">
                                        {flashcard?.question && flashcard.question.length > 50 
                                            ? `${flashcard.question.substring(0, 50)}...` 
                                            : flashcard?.question
                                        }
                                    </span>
                                </div>
                                <div className={`text-lg flex-shrink-0 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.isCorrect ? '✅' : '❌'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}