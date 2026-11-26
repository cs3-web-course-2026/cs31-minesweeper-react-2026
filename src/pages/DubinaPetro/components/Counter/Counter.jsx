import styles from './Counter.module.css';

function Counter({ className, isLive = false, label, value }) {
  const formattedValue = String(Math.min(value, 999)).padStart(3, '0');

  return (
    <div className={[styles.counter, className].filter(Boolean).join(' ')} aria-label={`${label}: ${formattedValue}`}>
      <span className={styles.label}>{label}</span>
      <output className={styles.value} aria-live={isLive ? 'polite' : undefined}>{formattedValue}</output>
    </div>
  );
}

export default Counter;
