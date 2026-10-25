import styles from './StatusIndicator.module.css';

export function Timer({ seconds }) {
  return <p className={styles.statusItem}>{seconds} s</p>;
}

export function FlagCounter({ count }) {
  return <p className={styles.statusItem}>{count} flags</p>;
}

export function GameStatus({ message }) {
  return (
    <p
      className={styles.statusItem}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
