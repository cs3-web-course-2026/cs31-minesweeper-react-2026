import styles from './CounterDisplay.module.css';

function formatValue(value) {
  if (value < 0) {
    return `-${String(Math.min(Math.abs(value), 99)).padStart(2, '0')}`;
  }
  return String(Math.min(value, 999)).padStart(3, '0');
}

export default function CounterDisplay({ icon, value, label, isLive = false }) {
  return (
    <div
      className={styles.lcdDisplay}
      role={isLive ? 'status' : undefined}
      aria-live={isLive ? 'polite' : undefined}
      aria-label={label}
    >
      <span className={styles.lcdIcon} aria-hidden="true">
        {icon}
      </span>
      <span>{formatValue(value)}</span>
    </div>
  );
}