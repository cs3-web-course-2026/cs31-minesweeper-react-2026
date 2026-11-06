import { memo } from 'react';

import { formatCounterValue } from '../utils/format';

import styles from './Counter.module.css';


function Timer({ seconds }) {
  return (
    <div
      className={styles.counter}
      role="timer"
      aria-label="Час гри"
    >
      <span className={styles.counterIcon} aria-hidden="true">⏱</span>
      <span className={styles.counterValue}>{formatCounterValue(seconds)}</span>
    </div>
  );
}


export default memo(Timer);
