import { GAME_STATUS } from '../../constants';
import styles from './GameStatus.module.css';

const getMessage = (status, gameTime) => {
  const messages = {
    [GAME_STATUS.WIN]: `Перемога! Час: ${gameTime} с`,
    [GAME_STATUS.LOSE]: 'Поразка: ви підірвалися на міні',
  };

  return messages[status] ?? '';
};

export default function GameStatus({ status, gameTime }) {
  return (
    <p className={styles.message} role="status" aria-live="polite" data-status={status}>
      {getMessage(status, gameTime)}
    </p>
  );
}
