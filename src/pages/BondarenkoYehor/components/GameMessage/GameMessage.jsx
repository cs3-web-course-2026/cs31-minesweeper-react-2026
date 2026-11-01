import { GAME_STATUS } from '../../game/constants';
import styles from './GameMessage.module.css';

const MESSAGES = {
  [GAME_STATUS.WIN]: { text: 'You win! All safe cells are opened.', className: styles.win },
  [GAME_STATUS.LOSE]: { text: 'Game over: you opened a mine.', className: '' },
};

function GameMessage({ status }) {
  const message = MESSAGES[status];
  if (!message) return null;

  return (
    <p className={`${styles.message} ${message.className}`} role="status" aria-live="polite">
      {message.text}
    </p>
  );
}

export default GameMessage;
