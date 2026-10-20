import { memo } from 'react';

import { COUNTER_DIGITS } from '../constants/game';

import styles from './MineCounter.module.css';


function formatCounter(count) {
  const nonNegative = Math.max(0, count);

  return String(nonNegative).padStart(COUNTER_DIGITS, '0');
}


function MineCounter({ remainingCount }) {
  return (
    <div
      className={styles.counter}
      role="status"
      aria-label="Залишилось прапорців"
    >
      <span className={styles.counterIcon} aria-hidden="true">🚩</span>
      <span className={styles.counterValue}>{formatCounter(remainingCount)}</span>
    </div>
  );
}


export default memo(MineCounter);
