import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface ControlCardsProps {
    onNext: () => void;
    onPrevious: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
    isLastCard: boolean;
}

export default function ControlCards({ 
    onNext, 
    onPrevious, 
    canGoNext, 
    canGoPrevious,
    isLastCard
}: ControlCardsProps) {
    return (
        <div className="flex w-full h-14 justify-end items-center gap-5">
            <button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className={`w-8 h-8 rounded-full flex justify-center items-center transition-colors duration-200 ${
                    canGoPrevious 
                        ? 'bg-white hover:bg-gray-100 cursor-pointer' 
                        : 'bg-gray-200 cursor-not-allowed opacity-50'
                }`}
            >
                <ChevronLeft className={canGoPrevious ? 'text-black' : 'text-gray-400'} />
            </button>
            <button
                onClick={onNext}
                className="bg-white hover:bg-gray-100 cursor-pointer w-8 h-8 rounded-full flex justify-center items-center transition-colors duration-200"
            >
                {isLastCard ? (
                    <CheckCircle className="text-green-600" size={20} />
                ) : (
                    <ChevronRight className="text-black" />
                )}
            </button>
        </div>
    );
}