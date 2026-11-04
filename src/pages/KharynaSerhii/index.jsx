import Board from './components/Board';
import FlagCounter from './components/FlagCounter';
import GameStatus from './components/GameStatus';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';
import { GAME_STATUS } from './constants';
import { useMinesweeper } from './hooks/useMinesweeper';
import styles from './Minesweeper.module.css';

/**
 * Головний компонент гри «Сапер»: збирає інтерфейс зі стану хука.
 * @returns {JSX.Element} Сторінка гри.
 */
function Minesweeper() {
  const {
    board, status, isStarted, gameId, flagsLeft, openCell, toggleFlag, restart,
  } = useMinesweeper();
  const isTimerRunning = isStarted && status === GAME_STATUS.PROCESS;

  return (
    <div className={styles.page}>
      <main className={styles.game}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Класична головоломка</p>
          <h1 className={styles.title}>Сапер</h1>

          <div className={styles.controls}>
            <FlagCounter value={flagsLeft} />
            <RestartButton status={status} onRestart={restart} />
            <Timer key={gameId} isRunning={isTimerRunning} />
          </div>
        </header>

        <section className={styles.boardSection} aria-label="Ігрове поле Сапера">
          <p className={styles.hint}>Лівий клік — відкрити. Правий клік або F — прапорець.</p>
          <Board board={board} status={status} onOpen={openCell} onFlag={toggleFlag} />
          <GameStatus status={status} isStarted={isStarted} />
        </section>
      </main>
    </div>
  );
}

export default Minesweeper;
