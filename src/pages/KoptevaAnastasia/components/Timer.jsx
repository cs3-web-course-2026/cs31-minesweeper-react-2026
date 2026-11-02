import { formatTime } from '../utils/time';

import styles from './Timer.module.css';

function Timer({ seconds }) {
  return (
    <p className={styles.timer}>
      <span className={styles.icon} aria-hidden="true">
        {'\u23F1'}
      </span>
      <span role="timer" aria-live="off">
        {formatTime(seconds)}
      </span>
    </p>
  );
}

export default Timer;
