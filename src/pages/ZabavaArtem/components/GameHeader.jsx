import styles from './GameHeader.module.css';

function formatCounter(value) {
  const sign = value < 0 ? '-' : '';
  const digits = String(Math.abs(value)).padStart(3 - sign.length, '0');
  return `${sign}${digits}`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}${String(remainingSeconds).padStart(2, '0')}`.slice(-3);
}

export default function GameHeader({ minesRemaining, gameTime, onNewGame }) {
  return (
    <header className={styles.header}>
      <output className={styles.counter} aria-label="Mines remaining">
        {formatCounter(minesRemaining)}
      </output>
      <button
        className={styles.newGame}
        type="button"
        aria-label="Start a new game"
        onClick={onNewGame}
      >
        <span aria-hidden="true">🙂</span>
      </button>
      <output className={styles.counter} aria-label="Elapsed time">
        {formatTime(gameTime)}
      </output>
    </header>
  );
}
