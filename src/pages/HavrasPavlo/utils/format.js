import { COUNTER_DIGITS } from '../constants/game.js';


// Від'ємне значення (прапорців більше, ніж мін) показуємо зі знаком: -1 → «-01»
export function formatCounterValue(value) {
  if (value < 0) {
    return `-${String(Math.abs(value)).padStart(COUNTER_DIGITS - 1, '0')}`;
  }

  return String(value).padStart(COUNTER_DIGITS, '0');
}
