import { GAME_MESSAGE, GAME_STATUS } from '../constants/game';

import styles from './GameStatus.module.css';

function GameStatus({ gameStatus }) {
  const messageClassName = [
    styles.message,
    gameStatus === GAME_STATUS.WON ? styles.won : '',
    gameStatus === GAME_STATUS.LOST ? styles.lost : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={messageClassName} role="status" aria-live="polite">
      {GAME_MESSAGE[gameStatus]}
    </p>
  );
}

export default GameStatus;
