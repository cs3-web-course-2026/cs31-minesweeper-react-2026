import { STATUS } from '../../gameLogic';
import styles from './GameStatus.module.css';

const MESSAGES = {
  [STATUS.IDLE]: 'Зробіть перший хід',
  [STATUS.PLAYING]: 'Гра триває',
  [STATUS.WON]: '🎉 Перемога!',
  [STATUS.LOST]: '💥 Ви підірвались',
};

export default function GameStatus({ status }) {
  const message = MESSAGES[status] || '';

  return (
      <p
          role="status"
          aria-live="polite"
          className={styles.status}
      >
        {message}
      </p>
  );
}