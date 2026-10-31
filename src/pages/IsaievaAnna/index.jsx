import Board from './components/Board';
import Timer from './components/Timer';
import GameStatus from './components/GameStatus';
import { useGameState } from './hooks/useGameState';
import RestartButton from './components/RestartButton';

import styles from './Game.module.css';

function Minesweeper() {
  const {
    board,
    gameStatus,
    seconds,
    remainingFlags,
    handleCellClick,
    handleCellRightClick,
    handleRestart,
  } = useGameState();

  return (
    <main className={styles.game}>
      <header className={styles.header}>
        <h1 className={styles.title}>✦ Minesweeper ✦</h1>
        <p className={styles.description}>
          Discover the hidden. Trust your intuition.
        </p>
      </header>

      <section className={styles.stats} aria-label="Game statistics">
        <div className={styles.statCard}>
          <span className={styles.statLabel}>✦ MINES</span>
          <span className={styles.statValue}>
      {String(remainingFlags).padStart(3, '0')}
    </span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>◷ TIME</span>
          <div className={styles.statValue}>
            <Timer seconds={seconds} />
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>✧ STATUS</span>
          <div className={styles.statStatus}>
            <GameStatus gameStatus={gameStatus} />
          </div>
        </div>
      </section>

      <Board
        board={board}
        gameStatus={gameStatus}
        onReveal={handleCellClick}
        onFlag={handleCellRightClick}
      />

      <RestartButton onRestart={handleRestart} />
    </main>
  );
}

export default Minesweeper;
