import { STATUS_ICONS } from '../constants/game';

import styles from './RestartButton.module.css';

export default function RestartButton({ status, onRestart }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onRestart}
      aria-label="Почати нову гру"
    >
      <span aria-hidden="true">{STATUS_ICONS[status]}</span>
      <span className={styles.label}>Рестарт</span>
    </button>
  );
}
