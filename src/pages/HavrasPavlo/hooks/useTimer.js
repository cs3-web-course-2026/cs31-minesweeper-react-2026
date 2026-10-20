import { useState, useEffect, useCallback } from 'react';

import { GAME_STATUS } from '../constants/game.js';


export function useTimer(gameStatus) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;

    if (gameStatus === GAME_STATUS.PLAYING) {
      intervalId = setInterval(() => {
        setElapsedSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [gameStatus]);

  const resetTimer = useCallback(() => {
    setElapsedSeconds(0);
  }, []);

  return {
    elapsedSeconds,
    resetTimer,
  };
}
