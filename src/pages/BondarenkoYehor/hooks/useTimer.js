import { useEffect, useState } from 'react';

export function useTimer(isRunning, resetKey) {
  const [timer, setTimer] = useState({ key: resetKey, seconds: 0 });

  useEffect(() => {
    if (!isRunning) return undefined;

    const id = setInterval(() => {
      setTimer((prev) => ({
        key: resetKey,
        seconds: prev.key === resetKey ? prev.seconds + 1 : 1,
      }));
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, resetKey]);

  return timer.key === resetKey ? timer.seconds : 0;
}
