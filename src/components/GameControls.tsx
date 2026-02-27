import { Button } from './ui/Button';

interface Props {
  isListening: boolean;
  isSupported: boolean;
  filledCount: number;
  closestToWin: { needed: number; line: string } | null;
  onToggleListening: () => void;
  onNewCard: () => void;
}

export function GameControls({
  isListening,
  isSupported,
  filledCount,
  closestToWin,
  onToggleListening,
  onNewCard,
}: Props) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-3 justify-center">
        {isSupported && (
          <Button
            variant={isListening ? 'secondary' : 'primary'}
            onClick={onToggleListening}
          >
            {isListening ? '⏹️ Stop Listening' : '🎤 Start Listening'}
          </Button>
        )}
        <Button variant="secondary" onClick={onNewCard}>
          🔄 New Card
        </Button>
      </div>

      <div className="flex justify-center gap-4 text-sm text-gray-500">
        <span>{filledCount}/25 filled</span>
        {closestToWin && (
          <span className="text-blue-600 font-medium">
            {closestToWin.needed === 1
              ? `🔥 One away! (${closestToWin.line})`
              : `${closestToWin.needed} away (${closestToWin.line})`}
          </span>
        )}
      </div>

      {!isSupported && (
        <p className="text-center text-sm text-amber-600">
          Speech recognition not supported in this browser. Use manual mode.
        </p>
      )}
    </div>
  );
}
