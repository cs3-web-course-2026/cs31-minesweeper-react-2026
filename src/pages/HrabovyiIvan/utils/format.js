import { COUNTER_DIGITS } from '../constants/game';

export function formatCounter(value) {
  return String(value).padStart(COUNTER_DIGITS, '0');
}
