import styles from '../Game.module.css';

export default function GameStatus({ status, onRestart }) {
  if (status === 'playing') return null;

  const won = status === 'win';

  return (
    <div className={styles.overlay} data-status={status}>
      <div className={styles.result}>
        <h2>{won ? 'Перемога!' : 'Ви підірвалися на міні!'}</h2>
        <button type="button" onClick={onRestart}>
          Грати знову
        </button>
      </div>
    </div>
  );
}
