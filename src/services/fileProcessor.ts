export interface FileProcessingResult {
  text: string;
  filename: string;
  fileType: string;
  error?: string;
}

export class FileProcessor {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly SUPPORTED_TEXT_TYPES = [
    'text/plain',
    'application/pdf',
    'text/markdown',
    'text/csv'
  ];
  private static readonly SUPPORTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
  ];

  static async processFile(file: File): Promise<FileProcessingResult> {
    const result: FileProcessingResult = {
      text: '',
      filename: file.name,
      fileType: file.type
    };

    try {
      // Check file size
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error('File size too large. Maximum size is 10MB.');
      }

      // Process based on file type
      if (this.SUPPORTED_TEXT_TYPES.includes(file.type)) {
        result.text = await this.extractTextFromDocument(file);
      } else if (this.SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        result.text = await this.extractTextFromImage();
      } else {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      if (!result.text.trim()) {
        throw new Error('No text could be extracted from the file.');
      }

      return result;
    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown error occurred';
      return result;
    }
  }

  private static async extractTextFromDocument(file: File): Promise<string> {
    if (file.type === 'application/pdf') {
      return await this.extractTextFromPDF();
    } else {
      // For text files, just read as text
      return await this.readFileAsText(file);
    }
  }

  private static async extractTextFromPDF(): Promise<string> {
    // For now, we'll return a placeholder message
    // In a full implementation, you'd use a library like PDF.js
    throw new Error('PDF processing not yet implemented. Please use text files or images with visible text.');
  }

  private static async extractTextFromImage(): Promise<string> {
    // For now, we'll return a placeholder message
    // In a full implementation, you'd use OCR like Tesseract.js
    throw new Error('Image OCR not yet implemented. Please use text files.');
  }

  private static async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        resolve(text);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  }

  static getSupportedTypes(): string[] {
    return [...this.SUPPORTED_TEXT_TYPES, ...this.SUPPORTED_IMAGE_TYPES];
  }

  static isSupported(fileType: string): boolean {
    return this.getSupportedTypes().includes(fileType);
  }
}