import { useEffect } from 'react';

import { SECOND } from '../constants/game';

// Хук відповідає лише за інтервал; самі секунди живуть у стані гри.
export function useTimer(isRunning, onTick) {
  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = setInterval(onTick, SECOND);

    return () => clearInterval(intervalId);
  }, [isRunning, onTick]);
}
