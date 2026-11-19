import { SMILEYS } from '../../constants';
import styles from './RestartButton.module.css';

export default function RestartButton({ status, onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Почати нову гру"
      onClick={onClick}
    >
      {SMILEYS[status]}
    </button>
  );
}
