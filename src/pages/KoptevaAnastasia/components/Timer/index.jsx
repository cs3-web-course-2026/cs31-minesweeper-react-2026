import { formatTime } from '../../gameLogic';
import styles from './Timer.module.css';

function Timer({ seconds }) {
  return (
    <p className={styles.timer}>
      <span className={styles.icon} aria-hidden="true">
        ⏱
      </span>
      <span role="timer" aria-live="off">
        {formatTime(seconds)}
      </span>
    </p>
  );
}

export default Timer;
