import styles from './StatusPanel.module.css';

export default function FlagCounter({ remainingFlags }) {
  return (
    <div
      className={styles.panel}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.label}>Прапорці</span>
      <span className={styles.value}>{remainingFlags}</span>
    </div>
  );
}
