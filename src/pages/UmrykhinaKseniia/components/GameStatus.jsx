import { GAME_STATUS } from '../constants/game';

import styles from './GameStatus.module.css';

const MESSAGE_BY_STATUS = {
  [GAME_STATUS.IDLE]: 'Click any cell to start',
  [GAME_STATUS.PLAYING]: 'Good luck!',
  [GAME_STATUS.WON]: 'You won! \u{1F389}',
  [GAME_STATUS.LOST]: 'Game over - you hit a mine',
};

const STATUS_CLASS = {
  [GAME_STATUS.WON]: styles.won,
  [GAME_STATUS.LOST]: styles.lost,
};

function GameStatus({ gameStatus }) {
  const messageClassName = [styles.message, STATUS_CLASS[gameStatus]]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={messageClassName} role="status" aria-live="polite">
      {MESSAGE_BY_STATUS[gameStatus]}
    </p>
  );
}

export default GameStatus;