import { useGameState } from './hooks/useGameState';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import MineCounter from './components/MineCounter';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';

import styles from './Game.module.css';

function HrabovyiIvanGame() {
  const {
    board,
    gameStatus,
    elapsedSeconds,
    explodedPosition,
    remainingFlags,
    revealCellAt,
    toggleFlagAt,
    restart,
  } = useGameState();

  return (
    <div className={styles.game}>
      <header className={styles.statusBar}>
        <MineCounter remainingFlags={remainingFlags} />
        <RestartButton onRestart={restart} />
        <Timer elapsedSeconds={elapsedSeconds} />
      </header>

      <main className={styles.main}>
        <Board
          board={board}
          gameStatus={gameStatus}
          explodedPosition={explodedPosition}
          onCellClick={revealCellAt}
          onCellRightClick={toggleFlagAt}
        />
        <GameStatus gameStatus={gameStatus} />
      </main>
    </div>
  );
}

export default HrabovyiIvanGame;
