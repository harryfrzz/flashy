interface WelcomeProps {
    onStartSampleQuiz: () => void;
}

export default function Welcome({ onStartSampleQuiz }: WelcomeProps) {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">Welcome to Flashy</h1>
                <p className="text-gray-600 text-sm">
                    Generate flashcards from your documents or try our sample quiz
                </p>
            </div>
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button 
                    onClick={onStartSampleQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Try Sample Quiz
                </button>
                
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Or upload a document to get started</p>
                    <p className="text-xs text-gray-400">
                        Click the attachment button below to upload your files
                    </p>
                </div>
            </div>
        </div>
    )
}
