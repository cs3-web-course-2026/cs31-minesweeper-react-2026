import styles from './Badge.module.css';

function Badge({ icon, iconClassName = '', children }) {
  return (
    <span className={styles.badge}>
      <span className={`${styles.icon} ${iconClassName}`}>{icon}</span>
      {children}
    </span>
  );
}

export default Badge;
