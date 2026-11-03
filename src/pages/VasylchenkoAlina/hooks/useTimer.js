import { useCallback, useEffect, useState } from 'react';

export function useTimer(isRunning) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = setInterval(
      () => setSeconds((previousSeconds) => previousSeconds + 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const reset = useCallback(() => setSeconds(0), []);

  return { seconds, reset };
}