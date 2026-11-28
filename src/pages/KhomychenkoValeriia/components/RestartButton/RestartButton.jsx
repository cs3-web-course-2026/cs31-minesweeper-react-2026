import { GAME_STATUS } from '../../constants/game';
import styles from './RestartButton.module.css';

function RestartButton({ status, onRestart }) {
  let icon = '🙂';
  if (status === GAME_STATUS.WIN) {
    icon = '😎';
  } else if (status === GAME_STATUS.LOSE) {
    icon = '😵';
  }

  return (
    <button
      type="button"
      className={styles.restartBtn}
      onClick={onRestart}
      aria-label="Почати гру заново"
    >
      {icon}
    </button>
  );
}

export default RestartButton;
