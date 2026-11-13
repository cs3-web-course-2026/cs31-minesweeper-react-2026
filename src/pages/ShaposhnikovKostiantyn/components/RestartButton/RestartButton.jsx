import { STATUS } from '../../gameLogic';
import styles from './RestartButton.module.css';

const FACES = {
  [STATUS.WON]: '😎',
  [STATUS.LOST]: '😵',
};

export default function RestartButton({ status, onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Почати спочатку"
    >
      {FACES[status] ?? '🙂'}
    </button>
  );
}
