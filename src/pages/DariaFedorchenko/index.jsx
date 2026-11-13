import useGameState from './hooks/useGameState';
import Board from './components/Board';
import Timer from './components/Timer';
import RestartButton from './components/RestartButton';
import GameStatus from './components/GameStatus';
import styles from './Game.module.css';

function FlagIcon() {
  return (
    <svg
      className={styles.flagIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className={styles.clockIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

export default function FedorchenkoDaria() {
  const {
    board,
    status,
    time,
    explodedCell,
    openCell,
    toggleFlag,
    restartGame,
    remainingMines,
  } = useGameState();

  return (
    <main className={styles.game}>
      <header className={styles.gameInfo}>
        <div className={styles.counter} aria-label="кількість прапорців">
          <FlagIcon />
          <strong>{String(remainingMines).padStart(3, '0')}</strong>
        </div>

        <RestartButton onRestart={restartGame} />

        <div className={styles.counter} aria-label="час гри">
          <ClockIcon />
          <Timer time={time} />
        </div>
      </header>

      <div className={styles.boardWrapper}>
        <Board
          board={board}
          status={status}
          explodedCell={explodedCell}
          onOpen={openCell}
          onFlag={toggleFlag}
        />

        <GameStatus status={status} onRestart={restartGame} />
      </div>
    </main>
  );
}
