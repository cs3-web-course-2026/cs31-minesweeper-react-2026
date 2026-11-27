import styles from './Timer.module.css';

function Timer({ label, value }) {
  const formattedValue = String(value).padStart(3, '0');

  return (
    <div className={styles.counterBox}>
      <span className={styles.srOnly}>{label}: </span>
      <span>{formattedValue}</span>
    </div>
  );
}

export default Timer;
