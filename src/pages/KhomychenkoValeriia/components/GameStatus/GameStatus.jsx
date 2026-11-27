import { GAME_STATUS } from '../../constants/game';
import styles from './GameStatus.module.css';

function GameStatus({ status }) {
  let message = 'Клікніть будь-яку клітинку для початку гри';
  const classNames = [styles.statusTip];

  if (status === GAME_STATUS.WIN) {
    message = 'Перемога! Ви розмінували все поле!';
    classNames.push(styles.win);
  } else if (status === GAME_STATUS.LOSE) {
    message = 'Гру закінчено! Ви натрапили на міну.';
    classNames.push(styles.lose);
  }

  return (
    <p role="status" aria-live="polite" className={classNames.join(' ')}>
      {message}
    </p>
  );
}

export default GameStatus;
