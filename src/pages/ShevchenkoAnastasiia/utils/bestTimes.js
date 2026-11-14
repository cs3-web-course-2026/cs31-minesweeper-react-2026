export function recordBestTime(bestTimes, difficulty, seconds) {
  const currentBest = bestTimes[difficulty];

  if (currentBest !== undefined && currentBest <= seconds) {
    return bestTimes;
  }

  return { ...bestTimes, [difficulty]: seconds };
}
