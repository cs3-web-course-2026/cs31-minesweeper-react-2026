import styles from './Counter.module.css';

const formatValue = (value) => (value < 0 ? '-' : '') + String(Math.abs(value)).padStart(3, '0');

/** Цифровий індикатор — використовується і для таймера, і для лічильника прапорців */
export default function Counter({ icon, value, label }) {
  return (
    <div className={styles.counter} role="group" aria-label={label}>
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <span>{formatValue(value)}</span>
    </div>
  );
}
