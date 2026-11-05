import { useCallback, useEffect, useState } from 'react';

import { GAME_STATUS, TIMER_INTERVAL_MS } from '../constants/game';


export function useTimer(isRunning, status) {
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    if (!isRunning || status !== GAME_STATUS.PROCESS) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setGameTime((previousTime) => previousTime + 1);
    }, TIMER_INTERVAL_MS);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning, status]);

  const resetTimer = useCallback(() => {
    setGameTime(0);
  }, []);

  return {
    gameTime,
    resetTimer,
  };
}
