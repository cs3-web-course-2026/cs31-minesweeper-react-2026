import styles from './StatusPanel.module.css';

export default function Timer({ seconds }) {
  return (
    <div className={styles.panel}>
      <span className={styles.label}>Час</span>
      <span className={styles.value} aria-label={`Час гри: ${seconds} с`}>
        {seconds} с
      </span>
    </div>
  );
}
