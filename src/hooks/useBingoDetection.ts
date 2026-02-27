import { useEffect, useRef, useMemo } from 'react';
import { BingoCard, WinningLine } from '../types';
import { checkForBingo, getClosestToWin } from '../lib/bingoChecker';

export function useBingoDetection(
  card: BingoCard | null,
  onWin: (line: WinningLine, lastWord: string) => void,
) {
  const hasWonRef = useRef(false);
  const lastFilledWordRef = useRef<string>('');

  // Track the most recently filled word
  useEffect(() => {
    if (!card) return;
    const filledSquares = card.squares
      .flat()
      .filter(sq => sq.isFilled && !sq.isFreeSpace)
      .sort((a, b) => (b.filledAt ?? 0) - (a.filledAt ?? 0));
    if (filledSquares.length > 0) {
      lastFilledWordRef.current = filledSquares[0].word;
    }
  }, [card]);

  // Check for bingo after each card update
  useEffect(() => {
    if (!card || hasWonRef.current) return;

    const winningLine = checkForBingo(card);
    if (winningLine) {
      hasWonRef.current = true;
      onWin(winningLine, lastFilledWordRef.current);
    }
  }, [card, onWin]);

  const closestToWin = useMemo(() => {
    if (!card) return null;
    return getClosestToWin(card);
  }, [card]);

  // Reset when card changes entirely (new game)
  const cardWordsKey = card?.words.join(',') ?? '';
  useEffect(() => {
    hasWonRef.current = false;
  }, [cardWordsKey]);

  return { closestToWin };
}
