import styles from './FlagCounter.module.css';

function FlagCounter({ flagsLeft }) {
  return (
    <p className={styles.counter} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        {'\u{1F6A9}'}
      </span>
      <span>{flagsLeft}</span>
      <span className={styles.visuallyHidden}>прапорців залишилось</span>
    </p>
  );
}

export default FlagCounter;
