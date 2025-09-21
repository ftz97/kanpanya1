"use client";

import { useState, useCallback } from 'react';
import { GameState } from '../types';

const INITIAL_STATE: GameState = {
  score: 0,
  level: 1,
  lives: 3,
  isPlaying: false,
  isPaused: false,
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
  }, []);

  const addScore = useCallback((points: number) => {
    setGameState(prev => ({ 
      ...prev, 
      score: prev.score + points,
      level: Math.floor((prev.score + points) / 100) + 1
    }));
  }, []);

  const loseLife = useCallback(() => {
    setGameState(prev => {
      const newLives = prev.lives - 1;
      return {
        ...prev,
        lives: newLives,
        isPlaying: newLives > 0 ? prev.isPlaying : false
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  const isGameOver = gameState.lives <= 0;
  const canPlay = gameState.isPlaying && !gameState.isPaused && !isGameOver;

  return {
    gameState,
    startGame,
    pauseGame,
    endGame,
    addScore,
    loseLife,
    resetGame,
    isGameOver,
    canPlay,
  };
}
