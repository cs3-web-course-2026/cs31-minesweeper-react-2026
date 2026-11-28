import { useMinesweeper } from './hooks/useMinesweeper';
import Board from './components/Board/Board';
import Timer from './components/Timer/Timer';
import RestartButton from './components/RestartButton/RestartButton';
import GameStatus from './components/GameStatus/GameStatus';
import styles from './Minesweeper.module.css';

function KhomychenkoValeriia() {
  const {
    board,
    cols,
    minesRemaining,
    gameTime,
    status,
    handleOpenCell,
    handleToggleFlag,
    restartGame,
  } = useMinesweeper();

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Minesweeper</h1>

      <div className={styles.controlPanel}>
        <Timer label="Залишилось мін" value={minesRemaining} />
        <RestartButton status={status} onRestart={restartGame} />
        <Timer label="Час гри" value={gameTime} />
      </div>

      <Board
        board={board}
        cols={cols}
        onOpenCell={handleOpenCell}
        onToggleFlag={handleToggleFlag}
      />

      <GameStatus status={status} />
    </section>
  );
}

export default KhomychenkoValeriia;
