import { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameState } from '../types';
import { CATEGORIES } from '../data/categories';
import { generateShareText, copyToClipboard, canNativeShare, nativeShare } from '../lib/shareUtils';
import { BingoCard } from './BingoCard';
import { Button } from './ui/Button';
import { Toast } from './ui/Toast';

interface Props {
  game: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function WinScreen({ game, onPlayAgain, onHome }: Props) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const category = CATEGORIES.find(c => c.id === game.category);

  useEffect(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    // Second burst for extra celebration
    setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.7 } });
    }, 500);
  }, []);

  const elapsed = game.startedAt && game.completedAt
    ? formatTime(game.completedAt - game.startedAt)
    : 'N/A';

  const handleShare = useCallback(async () => {
    const text = generateShareText(game);
    if (canNativeShare()) {
      try {
        await nativeShare(text, 'Meeting Bingo Result');
      } catch {
        // User cancelled share
      }
    } else {
      const success = await copyToClipboard(text);
      setToastMessage(success ? 'Copied to clipboard!' : 'Failed to copy');
    }
  }, [game]);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center max-w-lg w-full">
        {/* Celebration Header */}
        <div className="animate-bounce-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            🎉 BINGO! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You did it!
          </p>
        </div>

        {/* Card with winning line */}
        {game.card && (
          <div className="mb-6">
            <BingoCard
              card={game.card}
              winningLine={game.winningLine}
              onSquareClick={() => {}}
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-2xl font-bold text-blue-500">⏱️</p>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold text-gray-900">{elapsed}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-2xl font-bold text-blue-500">🏆</p>
            <p className="text-sm text-gray-500">Winning Word</p>
            <p className="font-semibold text-gray-900 text-xs">{game.winningWord || 'N/A'}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-2xl font-bold text-blue-500">📊</p>
            <p className="text-sm text-gray-500">Filled</p>
            <p className="font-semibold text-gray-900">{game.filledCount}/25</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Category: {category?.name}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button onClick={handleShare} variant="secondary">
            📤 Share Result
          </Button>
          <Button onClick={onPlayAgain}>
            🔄 Play Again
          </Button>
        </div>
        <button
          onClick={onHome}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Back to Home
        </button>
      </div>

      {toastMessage && (
        <Toast
          toast={{ id: 'share', message: toastMessage, type: 'success' }}
          onDismiss={dismissToast}
        />
      )}
    </div>
  );
}
