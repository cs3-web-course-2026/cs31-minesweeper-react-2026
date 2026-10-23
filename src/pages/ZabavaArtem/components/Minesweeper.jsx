import Board from './Board.jsx';
import GameHeader from './GameHeader.jsx';
import { useMinesweeper } from '../hooks/useMinesweeper.js';
import styles from './Minesweeper.module.css';

export default function Minesweeper() {
  const {
    board,
    gameTime,
    minesRemaining,
    message,
    getCellLabel,
    openCell,
    toggleFlag,
    resetGame,
  } = useMinesweeper();

  return (
    <div className={styles.appShell}>
      <main className={styles.game} aria-labelledby="game-title">
        <h1 id="game-title" className={styles.hidden}>
          Minesweeper
        </h1>
        <GameHeader
          minesRemaining={minesRemaining}
          gameTime={gameTime}
          onNewGame={resetGame}
        />
        <Board
          board={board}
          getCellLabel={getCellLabel}
          onOpenCell={openCell}
          onToggleFlag={toggleFlag}
        />
        <p className={styles.message} role="status" aria-live="polite">
          {message}
        </p>
      </main>
    </div>
  );
}
