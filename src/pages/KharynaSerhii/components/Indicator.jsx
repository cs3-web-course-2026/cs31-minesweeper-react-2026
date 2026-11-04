import { COUNTER_DIGITS } from '../constants';
import { joinClasses } from '../utils/joinClasses';
import styles from './Indicator.module.css';

/**
 * Показує лічильник із іконкою та підписом.
 * @param {Object} props Властивості компонента.
 * @param {string} props.icon Іконка індикатора.
 * @param {string} props.label Підпис під числом.
 * @param {number} props.value Значення, яке доповнюється нулями.
 * @param {'flags'|'time'} props.variant Варіант оформлення.
 * @param {boolean} [props.isLive] Чи озвучувати зміни скрінрідером.
 * @returns {JSX.Element} Індикатор.
 */
function Indicator({ icon, label, value, variant, isLive = false }) {

  return (
    <div
      className={joinClasses(styles.indicator, styles[variant])}
      role={isLive ? 'status' : undefined}
      aria-live={isLive ? 'polite' : undefined}
      aria-atomic={isLive ? true : undefined}
    >
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <span className={styles.value}>{String(value).padStart(COUNTER_DIGITS, '0')}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default Indicator;
