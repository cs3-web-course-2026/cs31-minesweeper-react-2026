import { GAME_STATUS } from '../constants/game';
import { STATUS_MESSAGE } from '../constants/ui';

import styles from './GameStatus.module.css';

const TONE_CLASS = {
  [GAME_STATUS.IDLE]: styles.hint,
  [GAME_STATUS.WON]: styles.win,
  [GAME_STATUS.LOST]: styles.lose,
};

function GameStatus({ status, bestTime }) {
  const messageClass = [styles.message, TONE_CLASS[status]]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={styles.gameStatus}>
      <p className={messageClass} role="status" aria-live="polite">
        {STATUS_MESSAGE[status]}
      </p>
      {bestTime !== null && (
        <p className={styles.bestTime}>🏆 Найкращий час: {bestTime} с</p>
      )}
    </footer>
  );
}

export default GameStatus;
