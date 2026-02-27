import { useState, useCallback, useRef } from 'react';
import { GameState, WinningLine } from '../types';
import { CATEGORIES } from '../data/categories';
import { detectWordsWithAliases } from '../lib/wordDetector';
import { generateCard, getCardWords } from '../lib/cardGenerator';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useGame } from '../hooks/useGame';
import { useBingoDetection } from '../hooks/useBingoDetection';
import { BingoCard } from './BingoCard';
import { GameControls } from './GameControls';
import { TranscriptPanel } from './TranscriptPanel';

interface Props {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
  onWin: (line: WinningLine, word: string) => void;
}

export function GameBoard({ game, setGame, onWin }: Props) {
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  const gameRef = useRef(game);
  gameRef.current = game;

  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const { fillSquare, autoFillWord } = useGame(game, setGame);
  const { closestToWin } = useBingoDetection(game.card, onWin);

  const category = CATEGORIES.find(c => c.id === game.category);

  const handleSpeechResult = useCallback((newTranscript: string) => {
    const currentGame = gameRef.current;
    if (!currentGame.card) return;

    const cardWords = getCardWords(currentGame.card);
    const filledWords = new Set(
      currentGame.card.squares
        .flat()
        .filter(sq => sq.isFilled && !sq.isFreeSpace)
        .map(sq => sq.word.toLowerCase())
    );

    const detected = detectWordsWithAliases(newTranscript, cardWords, filledWords);
    if (detected.length > 0) {
      setDetectedWords(prev => [...prev, ...detected]);
      detected.forEach(word => autoFillWord(word));
    }
  }, [autoFillWord]);

  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening(handleSpeechResult);
    }
  }, [isListening, startListening, stopListening, handleSpeechResult]);

  const handleNewCard = useCallback(() => {
    if (!game.category) return;
    const card = generateCard(game.category);
    setDetectedWords([]);
    stopListening();
    setGame(prev => ({
      ...prev,
      card,
      filledCount: 1,
      winningLine: null,
      winningWord: null,
      status: 'playing',
      startedAt: Date.now(),
    }));
  }, [game.category, setGame, stopListening]);

  if (!game.card) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{category?.icon}</span>
            <h2 className="text-lg font-bold text-gray-900">
              {category?.name}
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            {game.filledCount}/25 filled
          </div>
        </div>

        {/* Bingo Card */}
        <BingoCard
          card={game.card}
          winningLine={game.winningLine}
          onSquareClick={fillSquare}
        />

        {/* Controls */}
        <GameControls
          isListening={isListening}
          isSupported={isSupported}
          filledCount={game.filledCount}
          closestToWin={closestToWin}
          onToggleListening={handleToggleListening}
          onNewCard={handleNewCard}
        />

        {/* Transcript */}
        <TranscriptPanel
          transcript={transcript}
          interimTranscript={interimTranscript}
          detectedWords={detectedWords}
          isListening={isListening}
        />
      </div>
    </div>
  );
}
