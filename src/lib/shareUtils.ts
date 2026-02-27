import { GameState } from '../types';
import { CATEGORIES } from '../data/categories';

/**
 * Format elapsed time as "Xm Ys"
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

/**
 * Generate shareable text summary of the game
 */
export function generateShareText(game: GameState): string {
  const category = CATEGORIES.find(c => c.id === game.category);
  const elapsed = game.startedAt && game.completedAt
    ? formatTime(game.completedAt - game.startedAt)
    : 'N/A';

  const grid = game.card
    ? game.card.squares
        .map(row =>
          row.map(sq => {
            if (sq.isFreeSpace) return '⭐';
            if (sq.isFilled) return '🟦';
            return '⬜';
          }).join('')
        ).join('\n')
    : '';

  return [
    '🎯 Meeting Bingo — BINGO!',
    `Category: ${category?.name ?? 'Unknown'}`,
    `Time: ${elapsed} | Filled: ${game.filledCount}/25`,
    '',
    grid,
    '',
    'Play at: meetingbingo.vercel.app',
  ].join('\n');
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

/**
 * Check if native share API is available
 */
export function canNativeShare(): boolean {
  return typeof navigator.share === 'function';
}

/**
 * Share via native share API (mobile)
 */
export async function nativeShare(text: string, title: string): Promise<void> {
  await navigator.share({ title, text });
}
