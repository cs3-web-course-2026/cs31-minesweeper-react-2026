import styles from './GameStatus.module.css';
import { GAME_STATUS } from '../constants/game';

export default function GameStatus({ status, onRestart }) {
  const won = status === GAME_STATUS.WIN;
  const hasFinished = status !== GAME_STATUS.PLAYING;

  let resultMessage = '';

  if (won) {
    resultMessage = 'Перемога!';
  } else if (hasFinished) {
    resultMessage = 'Ви підірвалися на міні!';
  }

  return (
    <>
      <p
        className={styles.srOnly}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {resultMessage}
      </p>

      {hasFinished && (
        <div className={styles.overlay} data-status={status}>
          <div className={styles.result}>
            <h2>{resultMessage}</h2>
            <button type="button" onClick={onRestart}>
              Грати знову
            </button>
          </div>
        </div>
      )}
    </>
  );
}
