import Board from './components/Board/Board';
import DifficultySelect from './components/DifficultySelect/DifficultySelect';
import GameStatus from './components/GameStatus/GameStatus';
import RestartButton from './components/RestartButton/RestartButton';
import Timer from './components/Timer/Timer';
import useMinesweeper from './useMinesweeper';
import styles from './Minesweeper.module.css';
import { STATUS } from './gameLogic.js';

export default function Minesweeper() {
  const { board, status, difficulty, gameId, minesLeft, reveal, flag, restart } =
    useMinesweeper();

  return (
    <div className={styles.page}>
      <header className={styles.panel}>
        <GameStatus status={status} />
        <span className={styles.counter}>
          <span className={styles.visuallyHidden}>Залишилось мін: </span>
          💣 {minesLeft}
        </span>
        <Timer key={gameId} isRunning={status === STATUS.PLAYING} />
        <DifficultySelect value={difficulty} onChange={restart} />
        <RestartButton status={status} onClick={() => restart()} />
      </header>

      <section className={styles.boardArea} aria-label="Ігрове поле">
        <Board board={board} onReveal={reveal} onFlag={flag} />
      </section>
    </div>
  );
}