import Board from './components/Board/Board';
import DifficultySelect from './components/DifficultySelect/DifficultySelect';
import GameStatus from './components/GameStatus/GameStatus';
import RestartButton from './components/RestartButton/RestartButton';
import Timer from './components/Timer/Timer';
import useMinesweeper from './useMinesweeper';
import styles from './Minesweeper.module.css';

export default function Minesweeper() {
  const { board, status, difficulty, gameId, minesLeft, reveal, flag, restart } =
      useMinesweeper();

  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Minesweeper</h1>

      <DifficultySelect value={difficulty} onChange={restart} />

      <div className={styles.panel}>
        <span className={styles.counter}>💣 {minesLeft}</span>
        <RestartButton status={status} onClick={() => restart()} />
        <Timer key={gameId} status={status} />
      </div>

      <GameStatus status={status} />
      <Board board={board} onReveal={reveal} onFlag={flag} />
    </div>
  );
}
