import { useEffect } from 'react';

import { MS_PER_SECOND, TIMER_POLL_INTERVAL_MS } from '../constants/game';

export function useTimer(isRunning, onElapsedChange) {
  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const startedAt = Date.now();
    const intervalId = setInterval(() => {
      onElapsedChange(Math.floor((Date.now() - startedAt) / MS_PER_SECOND));
    }, TIMER_POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isRunning, onElapsedChange]);
}
