import { COUNTER_DIGITS, MAX_COUNTER_VALUE } from '../../constants';
import styles from './Counter.module.css';

export const formatCounter = (value) =>
  String(Math.min(value, MAX_COUNTER_VALUE)).padStart(COUNTER_DIGITS, '0');

export default function Counter({ icon, label, role, children }) {
  return (
    <div className={styles.counter} role={role} aria-label={label}>
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      {children}
    </div>
  );
}
