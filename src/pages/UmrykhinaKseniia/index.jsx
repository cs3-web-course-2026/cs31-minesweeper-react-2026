import { useCallback, useState } from 'react';

import Board from './components/Board';
import FlagModeToggle from './components/FlagModeToggle';
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
  const [isFlagMode, setIsFlagMode] = useState(false);

  const handleFlagModeToggle = useCallback(
    () => setIsFlagMode((previousMode) => !previousMode),
    [],
  );

  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Minesweeper</h1>

      <section className={styles.panel}>
        <header className={styles.statusBar}>
          <MineCounter minesRemaining={minesRemaining} />
          <RestartButton gameStatus={gameStatus} onRestart={restart} />
          <Timer elapsedSeconds={elapsedSeconds} />
        </header>

        <Board
          board={board}
          onReveal={isFlagMode ? toggleFlag : revealCell}
          onFlag={toggleFlag}
        />

        <GameStatus gameStatus={gameStatus} />

        <FlagModeToggle
          isFlagMode={isFlagMode}
          onToggle={handleFlagModeToggle}
        />
      </section>

      <p className={styles.hint}>
        Left click - open, right click or F key - flag. On touch screens, turn
        on flag mode to flag by tapping.
      </p>
    </main>
  );
}

export default UmrykhinaKseniia;