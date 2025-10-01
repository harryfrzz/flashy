# Flashy - Offline Flashcard Generator (Chrome Extension with Gemini Nano)

An offline-first **Chrome extension** that helps you learn smarter by turning your notes, PDFs, images, and highlighted text into **flashcards** – powered by **Gemini Nano**.

---

## Features

- **Highlight-to-Flashcard**: Highlight text on any webpage and instantly generate flashcards.  
- **PDF & Image Support**: Upload your own study material (PDFs, images) to extract content and create flashcards.  
- **Offline AI**: Works locally using **Gemini Nano**, ensuring privacy and no internet dependency.  
- **Summarization with Prompt API**: Automatically condenses text into concise Q&A flashcards.  
- **Modern UI**: Clean, fast, and responsive interface built with **Vite + React + TypeScript**.  

---

## Tech Stack

- **Frontend**: [React.js](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)  
- **AI**: [Gemini Nano](https://ai.google.dev/gemini-api/docs/gemini-nano) (Chrome built-in LLM)  
- **APIs**: Chrome APIs + Prompt API for summarization  

---

## 📦 Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/harryfrzz/offline-cards.git
   cd offline-cards
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Build the extension:  
   ```bash
   npm run build
   ```
4. Load the extension into Chrome:  
   - Open `chrome://extensions/`  
   - Enable **Developer mode**  
   - Click **Load unpacked** and select the `build/` folder
