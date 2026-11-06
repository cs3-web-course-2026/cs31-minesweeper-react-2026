import { useEffect, useState } from 'react';

import { GAME_STATUS } from '../constants/game';

// Hook для відліку часу
export function useTimer(status) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Таймер працює тільки під час гри
    if (status !== GAME_STATUS.PLAYING) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    // Очищення інтервалу
    return () => clearInterval(intervalId);
  }, [status]);

  // Форматування часу 
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;

  // Скидання таймера
  const resetTimer = () => {
    setSeconds(0);
  };

  return {
    seconds,
    formattedTime,
    resetTimer,
  };
}