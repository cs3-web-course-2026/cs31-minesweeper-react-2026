import { useCallback, useEffect, useState } from 'react';

export function useGameTimer(isRunning) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning]);

  const resetTimer = useCallback(() => setElapsedSeconds(0), []);

  return [elapsedSeconds, resetTimer];
}
