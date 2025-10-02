import { useState, useEffect } from "react";
import ControlCards from "./control-cards";
import OptionBubble from "./option-bubble";
import type { Flashcard, SelectedAnswer, QuizResult } from "../types/flashcard";

interface FlashCardProps {
    flashcard: Flashcard;
    currentIndex: number;
    totalCards: number;
    onNext: () => void;
    onPrevious: () => void;
    onAnswerSelected: (result: QuizResult) => void;
    existingAnswer?: QuizResult;
}

export default function FlashCard({ 
    flashcard, 
    currentIndex, 
    totalCards, 
    onNext, 
    onPrevious,
    onAnswerSelected,
    existingAnswer
}: FlashCardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [startTime] = useState(Date.now());

    // Load existing answer when component mounts or flashcard changes
    useEffect(() => {
        if (existingAnswer) {
            const selectedOption = flashcard.options.find(opt => opt.id === existingAnswer.selectedOptionId);
            if (selectedOption) {
                setSelectedAnswer({
                    optionId: existingAnswer.selectedOptionId,
                    isCorrect: existingAnswer.isCorrect
                });
                setShowResult(true);
            }
        } else {
            setSelectedAnswer(null);
            setShowResult(false);
        }
    }, [flashcard.id, existingAnswer]);

    const handleOptionClick = (optionId: string) => {
        if (showResult && existingAnswer) return; // Prevent changing answer if already answered
        
        const selectedOption = flashcard.options.find(opt => opt.id === optionId);
        if (selectedOption) {
            const answer: SelectedAnswer = {
                optionId,
                isCorrect: selectedOption.isCorrect
            };
            setSelectedAnswer(answer);
            setShowResult(true);

            // Save the result
            const result: QuizResult = {
                flashcardId: flashcard.id,
                selectedOptionId: optionId,
                isCorrect: selectedOption.isCorrect,
                timeSpent: Date.now() - startTime
            };
            onAnswerSelected(result);
        }
    };

    const handleNext = () => {
        onNext();
    };

    const handlePrevious = () => {
        onPrevious();
    };

    return (
        <div className="w-full bg-blue-200 rounded-2xl mt-16 px-5 py-4 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Header with question and counter */}
            <div className="relative mb-4 flex-shrink-0">
                <h1 className="text-lg font-bold pr-16 leading-tight break-words">{flashcard.question}</h1>
                <p className="absolute top-0 right-0 text-sm font-medium text-gray-600 bg-blue-200 px-2 py-1 rounded">{currentIndex + 1}/{totalCards}</p>
            </div>

            {/* Options container with proper spacing */}
            <div className="flex flex-col gap-3 mb-4 flex-grow">
                {flashcard.options.map((option) => (
                    <div 
                        key={option.id}
                        className={`w-full min-h-12 rounded-lg flex justify-start items-center px-3 py-3 gap-3 cursor-pointer transition-colors duration-200 ${
                            showResult && option.isCorrect 
                                ? 'bg-green-300' 
                                : showResult && selectedAnswer?.optionId === option.id && !option.isCorrect
                                ? 'bg-red-300'
                                : 'bg-blue-300 hover:bg-blue-400'
                        }`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        <OptionBubble 
                            optionStr={option.id.toUpperCase()}
                            isSelected={selectedAnswer?.optionId === option.id}
                            isCorrect={option.isCorrect}
                            showResult={showResult}
                            onClick={() => handleOptionClick(option.id)}
                        />
                        <p className="text-sm font-medium leading-relaxed flex-1 break-words">{option.text}</p>
                    </div>
                ))}
            </div>

            {/* Explanation section */}
            {showResult && (
                <div className="mb-4 p-4 bg-blue-100 rounded-lg border border-blue-300 flex-shrink-0">
                    <h3 className="font-semibold text-base mb-2">
                        {selectedAnswer?.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed break-words">{flashcard.explanation}</p>
                </div>
            )}

            {/* Control buttons - always at bottom */}
            <div className="flex-shrink-0">
                <ControlCards 
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    canGoNext={currentIndex < totalCards - 1}
                    canGoPrevious={currentIndex > 0}
                    isLastCard={currentIndex === totalCards - 1}
                />
            </div>
        </div>
    );
}