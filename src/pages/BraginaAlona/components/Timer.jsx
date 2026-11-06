import styles from './Timer.module.css';

function Timer({ time }) {
  return (
    <div className={styles.timer} aria-label={`Час гри: ${time}`}>
      <span className={styles.label}>ЧАС</span>
      <span className={styles.value} aria-live="off">
        {time}
      </span>
    </div>
  );
}

export default Timer;