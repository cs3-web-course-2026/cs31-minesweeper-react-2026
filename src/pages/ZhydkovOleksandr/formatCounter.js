import { COUNTER_DIGITS, MAX_COUNTER_VALUE } from './constants';

export const formatCounter = (value) =>
  String(Math.min(value, MAX_COUNTER_VALUE)).padStart(COUNTER_DIGITS, '0');
