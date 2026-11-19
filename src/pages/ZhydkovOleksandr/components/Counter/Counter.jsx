import styles from './Counter.module.css';

export default function Counter({ icon, label, role, children }) {
  return (
    <div className={styles.counter} role={role} aria-label={label}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      {children}
    </div>
  );
}
