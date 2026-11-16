import { GAME_STATUS } from '../utils/gameLogic';
import styles from './RestartButton.module.css';

const STATUS_FACES = {
  [GAME_STATUS.PROCESS]: '🙂',
  [GAME_STATUS.WIN]: '😎',
  [GAME_STATUS.LOSE]: '😵',
};

export default function RestartButton({ status, onRestart }) {
  return (
    <button
      type="button"
      className={styles.faceBtn}
      onClick={onRestart}
      aria-label="Почати нову гру"
    >
      {STATUS_FACES[status] ?? '🙂'}
    </button>
  );
}