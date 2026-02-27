import { useCallback, useRef } from 'react';
import { GameState, BingoCard } from '../types';
import { countFilled } from '../lib/bingoChecker';

type SetGame = React.Dispatch<React.SetStateAction<GameState>>;

export function useGame(game: GameState, setGame: SetGame) {
  const detectedWordsRef = useRef<string[]>([]);

  const fillSquare = useCallback((row: number, col: number) => {
    setGame(prev => {
      if (!prev.card) return prev;
      const square = prev.card.squares[row][col];
      // Don't toggle free space or auto-filled squares
      if (square.isFreeSpace || square.isAutoFilled) return prev;

      const newSquares = prev.card.squares.map((r, ri) =>
        r.map((sq, ci) => {
          if (ri === row && ci === col) {
            return {
              ...sq,
              isFilled: !sq.isFilled,
              filledAt: !sq.isFilled ? Date.now() : null,
            };
          }
          return sq;
        })
      );

      const newCard: BingoCard = { ...prev.card, squares: newSquares };
      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, [setGame]);

  const autoFillWord = useCallback((word: string) => {
    setGame(prev => {
      if (!prev.card) return prev;

      let found = false;
      const newSquares = prev.card.squares.map(r =>
        r.map(sq => {
          if (sq.word.toLowerCase() === word.toLowerCase() && !sq.isFilled) {
            found = true;
            return {
              ...sq,
              isFilled: true,
              isAutoFilled: true,
              filledAt: Date.now(),
            };
          }
          return sq;
        })
      );

      if (!found) return prev;

      const newCard: BingoCard = { ...prev.card, squares: newSquares };
      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, [setGame]);

  const getFilledWords = useCallback((): Set<string> => {
    if (!game.card) return new Set();
    return new Set(
      game.card.squares
        .flat()
        .filter(sq => sq.isFilled && !sq.isFreeSpace)
        .map(sq => sq.word.toLowerCase())
    );
  }, [game.card]);

  const addDetectedWords = useCallback((words: string[]) => {
    detectedWordsRef.current = [...detectedWordsRef.current, ...words];
  }, []);

  const getDetectedWords = useCallback((): string[] => {
    return detectedWordsRef.current;
  }, []);

  const resetDetectedWords = useCallback(() => {
    detectedWordsRef.current = [];
  }, []);

  return {
    fillSquare,
    autoFillWord,
    getFilledWords,
    addDetectedWords,
    getDetectedWords,
    resetDetectedWords,
  };
}
