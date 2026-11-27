import { GAME_STATUS } from '../../constants';
import styles from './GameStatus.module.css';

const STATUS_TEXT = {
  [GAME_STATUS.PROCESS]: 'Game in progress',
  [GAME_STATUS.WIN]: 'You win! All safe cells are open.',
  [GAME_STATUS.LOSE]: 'Game over. You hit a mine.',
};

function GameStatus({ status }) {
  return (
    <p className={styles.status} role="status" aria-live="polite">
      {STATUS_TEXT[status]}
    </p>
  );
}

export default GameStatus;
