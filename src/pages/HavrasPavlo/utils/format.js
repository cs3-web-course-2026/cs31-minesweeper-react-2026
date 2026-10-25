import { COUNTER_DIGITS } from '../constants/game.js';


export function formatCounterValue(value) {
  const nonNegative = Math.max(0, value);

  return String(nonNegative).padStart(COUNTER_DIGITS, '0');
}
