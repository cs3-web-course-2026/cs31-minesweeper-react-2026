import { memo } from 'react';

import { GAME_STATUS } from '../constants/game';

import styles from './GameStatus.module.css';


function getStatusMessage(gameStatus) {
  if (gameStatus === GAME_STATUS.WON) {
    return 'Вітаємо! Ви перемогли!';
  }

  if (gameStatus === GAME_STATUS.LOST) {
    return 'Гру закінчено! Ви натрапили на міну.';
  }

  if (gameStatus === GAME_STATUS.PLAYING) {
    return 'Гра триває... Розмінуйте всі безпечні клітинки!';
  }

  return 'Клацніть будь-яку клітинку, щоб почати гру.';
}


function GameStatus({ gameStatus }) {
  const message = getStatusMessage(gameStatus);

  return (
    <p
      className={styles.statusMessage}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}


export default memo(GameStatus);
