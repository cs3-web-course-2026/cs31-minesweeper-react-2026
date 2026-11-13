import { GAME_STATUS } from '../../gameLogic';
import styles from './GameMessage.module.css';

const MESSAGES = {
  [GAME_STATUS.WIN]: '🎉 Перемога!',
  [GAME_STATUS.LOSE]: '☠ Ви підірвались на міні!',
  [GAME_STATUS.PROCESS]: '',
};

const STATUS_CLASS = {
  [GAME_STATUS.WIN]: styles.win,
  [GAME_STATUS.LOSE]: styles.lose,
  [GAME_STATUS.PROCESS]: '',
};

function GameMessage({ status }) {
  return (
    <p className={`${styles.message} ${STATUS_CLASS[status]}`} role="status" aria-live="polite">
      {MESSAGES[status]}
    </p>
  );
}

export default GameMessage;
