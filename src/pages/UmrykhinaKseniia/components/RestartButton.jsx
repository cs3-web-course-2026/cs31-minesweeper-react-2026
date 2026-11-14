import { GAME_STATUS } from '../constants/game';

import styles from './RestartButton.module.css';

const FACE_BY_STATUS = {
  [GAME_STATUS.IDLE]: '\u{1F642}',
  [GAME_STATUS.PLAYING]: '\u{1F642}',
  [GAME_STATUS.WON]: '\u{1F60E}',
  [GAME_STATUS.LOST]: '\u{1F635}',
};

function RestartButton({ gameStatus, onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      aria-label="Restart game"
      onClick={onRestart}
    >
      {FACE_BY_STATUS[gameStatus]}
    </button>
  );
}

export default RestartButton;