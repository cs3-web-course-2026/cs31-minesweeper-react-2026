import Board from './components/Board/Board';
import FlagsCounter from './components/FlagsCounter/FlagsCounter';
import GameStatus from './components/GameStatus/GameStatus';
import RestartButton from './components/RestartButton/RestartButton';
import Timer from './components/Timer/Timer';
import { useMinesweeper } from './useMinesweeper';
import styles from './Minesweeper.module.css';

export default function Minesweeper() {
  const game = useMinesweeper();

  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Minesweeper</h1>

      <header className={styles.header}>
        <FlagsCounter value={game.flagsLeft} />
        <RestartButton status={game.status} onClick={game.restartGame} />
        <Timer seconds={game.gameTime} />
      </header>

      <GameStatus status={game.status} gameTime={game.gameTime} />

      <Board
        board={game.board}
        cols={game.cols}
        status={game.status}
        onOpenCell={game.handleOpenCell}
        onToggleFlag={game.handleToggleFlag}
      />
    </main>
  );
}
