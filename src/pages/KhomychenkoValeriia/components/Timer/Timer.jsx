import styles from './Timer.module.css';

function Timer({ label, value }) {
  const formattedValue = String(value).padStart(3, '0');

  return (
    <div className={styles.counterBox} aria-label={label}>
      {formattedValue}
    </div>
  );
}

export default Timer;
