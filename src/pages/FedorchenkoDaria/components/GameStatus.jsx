import styles from '../Game.module.css';

export default function GameStatus({ status, onRestart }) {
  const won = status === 'win';
  const hasFinished = status !== 'playing';

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
