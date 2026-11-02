import { GAME_STATUS } from '../constants/game';

import styles from './GameStatus.module.css';

const MESSAGE = {
  [GAME_STATUS.IDLE]: 'Start',
  [GAME_STATUS.PROCESS]: 'Лівий клік відкриває, правий ставить прапорець',
  [GAME_STATUS.WIN]: 'Перемога!',
  [GAME_STATUS.LOSE]: 'Міна. Спробуйте ще раз',
};

const STATUS_CLASS = {
  [GAME_STATUS.WIN]: styles.win,
  [GAME_STATUS.LOSE]: styles.lose,
};

function GameStatus({ status }) {
  const className = [styles.status, STATUS_CLASS[status]]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={className} role="status" aria-live="polite">
      {MESSAGE[status]}
    </p>
  );
}

export default GameStatus;
