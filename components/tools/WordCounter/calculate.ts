export interface WordCountResult {
  words: number;
  chars: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  readingSeconds: number;
  speakingMinutes: number;
  speakingSeconds: number;
}

const READING_SPEED = 200; // words per minute
const SPEAKING_SPEED = 150; // words per minute

export function countWords(text: string): WordCountResult {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      chars: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingMinutes: 0,
      readingSeconds: 0,
      speakingMinutes: 0,
      speakingSeconds: 0,
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const chars = trimmed.length;
  const charsNoSpaces = trimmed.replace(/\s/g, '').length;
  // Handle Arabic and Latin sentence endings
  const sentences = trimmed.split(/[.!?؟\n]+/).filter((s) => s.trim().length > 0).length || 1;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;

  const totalReadingSecs = Math.round((words / READING_SPEED) * 60);
  const totalSpeakingSecs = Math.round((words / SPEAKING_SPEED) * 60);

  return {
    words,
    chars,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingMinutes: Math.floor(totalReadingSecs / 60),
    readingSeconds: totalReadingSecs % 60,
    speakingMinutes: Math.floor(totalSpeakingSecs / 60),
    speakingSeconds: totalSpeakingSecs % 60,
  };
}