import styles from './Timer.module.css';

const DISPLAY_DIGITS = 3;

function Timer({ elapsedSeconds }) {
  return (
    <div className={styles.timer} role="timer" aria-label="Elapsed time">
      <span aria-hidden="true">{'\u23F1'}</span>
      <span>{String(elapsedSeconds).padStart(DISPLAY_DIGITS, '0')}</span>
    </div>
  );
}

export default Timer;