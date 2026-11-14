import { formatCounter } from '../utils/format';

import styles from './CounterDisplay.module.css';

function CounterDisplay({ icon, label, value, role }) {
  return (
    <output
      className={styles.counter}
      role={role}
      aria-label={label}
      aria-live="off"
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.value}>{formatCounter(value)}</span>
    </output>
  );
}

export default CounterDisplay;
