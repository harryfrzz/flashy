interface OptionBubbleProps {
    optionStr: string;
    isSelected: boolean;
    isCorrect?: boolean;
    showResult: boolean;
    onClick: () => void;
}

export default function OptionBubble({ 
    optionStr, 
    isSelected, 
    isCorrect, 
    showResult, 
    onClick 
}: OptionBubbleProps) {
    const getBackgroundColor = () => {
        if (!showResult && !isSelected) return 'bg-blue-50';
        if (!showResult && isSelected) return 'bg-blue-200';
        if (showResult && isSelected && isCorrect) return 'bg-green-400';
        if (showResult && isSelected && !isCorrect) return 'bg-red-400';
        if (showResult && !isSelected && isCorrect) return 'bg-green-200';
        return 'bg-blue-50';
    };

    const getTextColor = () => {
        if (showResult && isSelected) return 'text-white';
        if (showResult && !isSelected && isCorrect) return 'text-green-800';
        return 'text-black';
    };

    return (
        <div 
            className={`w-5 h-5 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200 ${getBackgroundColor()}`}
            onClick={onClick}
        >
            <p className={`text-sm font-medium ${getTextColor()}`}>{optionStr}</p>
        </div>
    );
}