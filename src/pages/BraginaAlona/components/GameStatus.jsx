import { GAME_STATUS } from '../constants/game';
import styles from './GameStatus.module.css';

function GameStatus({ status }) {
  let message = 'Натисніть на клітинку, щоб почати гру';
  let className = styles.idle;

  if (status === GAME_STATUS.PLAYING) {
    message = 'Гра триває. Удачі!';
    className = styles.playing;
  } else if (status === GAME_STATUS.WON) {
    message = 'Вітаємо! Ви перемогли!';
    className = styles.won;
  } else if (status === GAME_STATUS.LOST) {
    message = 'На жаль, ви натрапили на міну!';
    className = styles.lost;
  }

  return (
    <div
      className={`${styles.status} ${className}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export default GameStatus;