import { useEffect } from 'react';

import { BEST_TIMES_STORAGE_KEY } from '../constants/game';

export function loadBestTimes() {
  try {
    const storedValue = localStorage.getItem(BEST_TIMES_STORAGE_KEY);
    const bestTimes = storedValue ? JSON.parse(storedValue) : {};

    return bestTimes && typeof bestTimes === 'object' ? bestTimes : {};
  } catch {
    return {};
  }
}

export function usePersistBestTimes(bestTimes) {
  useEffect(() => {
    try {
      localStorage.setItem(BEST_TIMES_STORAGE_KEY, JSON.stringify(bestTimes));
    } catch {
      return;
    }
  }, [bestTimes]);
}
