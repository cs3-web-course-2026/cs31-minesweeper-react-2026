import Board from './components/Board';
import GameStatus from './components/GameStatus';
import MineCounter from './components/MineCounter';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';
import { useGameState } from './hooks/useGameState';

import styles from './Game.module.css';

function UmrykhinaKseniia() {
  const {
    board,
    gameStatus,
    elapsedSeconds,
    minesRemaining,
    revealCell,
    toggleFlag,
    restart,
  } = useGameState();

  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Minesweeper</h1>

      <section className={styles.panel}>
        <header className={styles.statusBar}>
          <MineCounter minesRemaining={minesRemaining} />
          <RestartButton gameStatus={gameStatus} onRestart={restart} />
          <Timer elapsedSeconds={elapsedSeconds} />
        </header>

        <Board board={board} onReveal={revealCell} onFlag={toggleFlag} />

        <GameStatus gameStatus={gameStatus} />
      </section>

      <p className={styles.hint}>Left click - open, right click or F key - flag</p>
    </main>
  );
}

export default UmrykhinaKseniia;