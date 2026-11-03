import { useCallback, useEffect, useState } from 'react';

export function useTimer(isRunning) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const reset = useCallback(() => setSeconds(0), []);

  return { seconds, reset };
}
