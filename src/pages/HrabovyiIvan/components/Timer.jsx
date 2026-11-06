import { formatCounter } from '../utils/format';

import styles from './Timer.module.css';

function Timer({ elapsedSeconds }) {
  return (
    <div
      className={styles.timer}
      role="timer"
      aria-label={`Elapsed time: ${elapsedSeconds} seconds`}
    >
      <span aria-hidden="true">⏱</span>
      <span className={styles.value} aria-hidden="true">
        {formatCounter(elapsedSeconds)}
      </span>
    </div>
  );
}

export default Timer;
