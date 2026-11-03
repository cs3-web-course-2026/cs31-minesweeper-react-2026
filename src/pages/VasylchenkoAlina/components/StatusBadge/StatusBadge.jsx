import styles from './StatusBadge.module.css';

// Універсальний бейдж «іконка + трицифрове число» для таймера та лічильника прапорців
function StatusBadge({ icon, value, label, live = 'polite', align = 'start' }) {
  return (
    <div className={`${styles.badge} ${styles[align]}`}>
      <span aria-hidden="true">{icon}</span>
      <output aria-live={live} aria-label={label}>
        {String(value).padStart(3, '0')}
      </output>
    </div>
  );
}

export default StatusBadge;
