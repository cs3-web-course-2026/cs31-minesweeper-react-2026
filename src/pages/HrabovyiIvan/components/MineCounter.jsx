import { formatCounter } from '../utils/format';

import styles from './MineCounter.module.css';

function MineCounter({ remainingFlags }) {
  return (
    <div
      className={styles.counter}
      role="status"
      aria-label={`Flags remaining: ${remainingFlags}`}
    >
      <span aria-hidden="true">🚩</span>
      <span className={styles.value} aria-hidden="true">
        {formatCounter(remainingFlags)}
      </span>
    </div>
  );
}

export default MineCounter;
