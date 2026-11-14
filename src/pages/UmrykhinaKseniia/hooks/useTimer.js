import { useEffect } from 'react';

import { TIMER_INTERVAL_MS } from '../constants/game';

export function useTimer(isRunning, onTick) {
  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = setInterval(onTick, TIMER_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isRunning, onTick]);
}