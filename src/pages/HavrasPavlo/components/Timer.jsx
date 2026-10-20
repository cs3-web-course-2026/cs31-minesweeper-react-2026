import { memo } from 'react';

import { COUNTER_DIGITS } from '../constants/game';

import styles from './Timer.module.css';


function formatSeconds(seconds) {
  const nonNegative = Math.max(0, seconds);

  return String(nonNegative).padStart(COUNTER_DIGITS, '0');
}


function Timer({ seconds }) {
  return (
    <div
      className={styles.counter}
      role="timer"
      aria-label="Час гри"
    >
      <span className={styles.counterIcon} aria-hidden="true">⏱</span>
      <span className={styles.counterValue}>{formatSeconds(seconds)}</span>
    </div>
  );
}


export default memo(Timer);
