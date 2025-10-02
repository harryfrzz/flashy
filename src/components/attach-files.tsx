import { FileText, Image, Upload, X, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { FileProcessor } from "../services/fileProcessor";
import type { FileProcessingResult } from "../services/fileProcessor";
import { FlashcardGenerator } from "../services/flashcardGenerator";
import type { FlashcardGenerationResult } from "../services/flashcardGenerator";
import type { Flashcard } from "../types/flashcard";

interface AttachFileProps {
    isOpen: boolean;
    onFlashcardsGenerated: (flashcards: Flashcard[]) => void;
    onClose: () => void;
}

interface ProcessingStatus {
    stage: 'idle' | 'reading' | 'generating' | 'complete' | 'error';
    message: string;
    progress?: number;
}

export default function AttachFile({ isOpen, onFlashcardsGenerated, onClose }: AttachFileProps) {
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
        stage: 'idle',
        message: ''
    });
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        
        const file = files[0];
        await processFile(file);
    };

    const processFile = async (file: File) => {
        try {
            // Stage 1: Reading file
            setProcessingStatus({
                stage: 'reading',
                message: `Reading ${file.name}...`,
                progress: 25
            });

            const fileResult: FileProcessingResult = await FileProcessor.processFile(file);
            
            if (fileResult.error) {
                throw new Error(fileResult.error);
            }

            // Stage 2: Generating flashcards
            setProcessingStatus({
                stage: 'generating',
                message: 'Generating flashcards from content...',
                progress: 75
            });

            const generationResult: FlashcardGenerationResult = await FlashcardGenerator.generateFromText(
                fileResult.text,
                { maxCards: 5 }
            );

            if (generationResult.error) {
                throw new Error(generationResult.error);
            }

            // Stage 3: Complete
            setProcessingStatus({
                stage: 'complete',
                message: `Generated ${generationResult.flashcards.length} flashcards successfully!`,
                progress: 100
            });

            // Pass flashcards to parent component
            onFlashcardsGenerated(generationResult.flashcards);

            // Reset after a short delay
            setTimeout(() => {
                setProcessingStatus({ stage: 'idle', message: '' });
                onClose();
            }, 2000);

        } catch (error) {
            setProcessingStatus({
                stage: 'error',
                message: error instanceof Error ? error.message : 'An unknown error occurred'
            });

            // Reset error after 5 seconds
            setTimeout(() => {
                setProcessingStatus({ stage: 'idle', message: '' });
            }, 5000);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const isProcessing = processingStatus.stage !== 'idle';

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
            />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
            />
            
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={`
                    absolute bottom-20 right-5 p-3 gap-3 h-auto w-72 bg-blue-200 z-40 rounded-lg shadow-lg transition-all duration-200
                    ${isOpen ? 'flex flex-col opacity-100 scale-100' : 'hidden opacity-0 scale-95'}
                    ${dragOver ? 'ring-2 ring-blue-400 bg-blue-100' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Close button */}
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Upload Files</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-300 rounded transition-colors"
                        disabled={isProcessing}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Processing Status */}
                {isProcessing && (
                    <div className="bg-blue-100 rounded-lg p-3 border">
                        <div className="flex items-center gap-2 mb-2">
                            {processingStatus.stage === 'error' ? (
                                <AlertCircle size={16} className="text-red-500" />
                            ) : processingStatus.stage === 'complete' ? (
                                <CheckCircle size={16} className="text-green-500" />
                            ) : (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                            <span className="text-sm font-medium">
                                {processingStatus.stage === 'reading' && 'Reading File'}
                                {processingStatus.stage === 'generating' && 'Generating Flashcards'}
                                {processingStatus.stage === 'complete' && 'Complete!'}
                                {processingStatus.stage === 'error' && 'Error'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{processingStatus.message}</p>
                        {processingStatus.progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${processingStatus.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* File Upload Options */}
                {!isProcessing && (
                    <>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
                            <Upload size={24} className="mx-auto mb-2 text-blue-500" />
                            <p className="text-xs text-gray-600 mb-2">Drag & drop files here or click to upload</p>
                            <p className="text-xs text-gray-500">Supported: TXT, MD, CSV files</p>
                        </div>
                        
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full px-2 py-2 bg-blue-300 hover:bg-blue-400 flex justify-start items-center text-sm gap-2 rounded-sm transition-colors"
                        >
                            <FileText size={20}/>
                            <span>Upload Document</span>
                        </button>
                        
                        <button
                            onClick={() => imageInputRef.current?.click()}
                            className="w-full px-2 py-2 bg-blue-300 hover:bg-blue-400 flex justify-start items-center text-sm gap-2 rounded-sm transition-colors opacity-50 cursor-not-allowed"
                            disabled
                        >
                            <Image size={20}/>
                            <span>Upload Image (Coming Soon)</span>
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
