import { memo } from 'react';

import { formatCounterValue } from '../utils/format';

import styles from './Counter.module.css';


function MineCounter({ remainingCount }) {
  return (
    <div
      className={styles.counter}
      role="status"
      aria-label="Залишилось прапорців"
    >
      <span className={styles.counterIcon} aria-hidden="true">🚩</span>
      <span className={styles.counterValue}>{formatCounterValue(remainingCount)}</span>
    </div>
  );
}


export default memo(MineCounter);
