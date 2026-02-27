import { Button } from './ui/Button';

interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Meeting Bingo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Turn boring meetings into a game.
          <br />
          Auto-detects buzzwords using speech recognition!
        </p>

        <Button size="lg" onClick={onStart}>
          🎮 New Game
        </Button>

        <div className="mt-12 text-sm text-gray-400 space-y-4">
          <p className="font-medium text-gray-500">How It Works</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-lg">1️⃣</span>
              <p className="mt-1">Pick a buzzword category</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-lg">2️⃣</span>
              <p className="mt-1">Enable mic for auto-detection</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-lg">3️⃣</span>
              <p className="mt-1">Join your meeting and listen</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-lg">4️⃣</span>
              <p className="mt-1">Watch squares fill automatically!</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          🔒 Audio is processed locally in your browser. Nothing is ever recorded or sent to a server.
        </p>
      </div>
    </div>
  );
}
