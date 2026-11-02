import { useEffect } from 'react';

import { SECOND } from '../constants/game';

export function useTimer(isRunning, onTick) {
  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = setInterval(onTick, SECOND);

    return () => clearInterval(intervalId);
  }, [isRunning, onTick]);
}
