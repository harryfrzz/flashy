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
        <div className="w-full h-auto min-h-auto max-h-105 bg-blue-200 rounded-2xl mt-14 px-5 py-7 flex overflow-scroll flex-col">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(summary.score)}`}>
                    {Math.round(summary.score)}%
                </div>
                <p className="text-lg font-semibold mb-4">{getScoreMessage(summary.score)}</p>
            </div>
            <div className="flex gap-3 mb-8">
                <button
                    onClick={onRestartQuiz}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                    Try Again
                </button>
                <button
                    onClick={onBackToHome}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                    Back to Home
                </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">Summary</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">{summary.totalQuestions}</div>
                        <div className="text-sm text-gray-600">Total Questions</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600">{summary.correctAnswers}</div>
                        <div className="text-sm text-gray-600">Correct</div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-100 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3">Question Results</h2>
                {summary.results.map((result, index) => {
                    const flashcard = flashcards.find(f => f.id === result.flashcardId);
                    return (
                        <div key={result.flashcardId} className="flex items-center justify-between py-2 border-b border-blue-200 last:border-b-0">
                            <div className="flex-1">
                                <span className="text-sm font-medium">Q{index + 1}: </span>
                                <span className="text-sm">{flashcard?.question.substring(0, 40)}...</span>
                            </div>
                            <div className={`text-lg ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {result.isCorrect ? '✅' : '❌'}
                            </div>
                        </div>
                    );
                })}
            </div>

            
        </div>
    );
}