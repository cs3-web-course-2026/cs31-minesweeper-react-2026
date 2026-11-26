import { useGameState } from './hooks/useGameState';
import Timer from './components/Timer';
import RestartButton from './components/RestartButton';
import GameStatus from './components/GameStatus';
import Board from './components/Board';
import styles from './Game.module.css';

export default function BorysenkoKira() {
  const {
    board,
    status,
    gameTime,
    flagsLeft,
    explodedCell,
    initGame,
    handleOpenCell,
    handleToggleFlag,
  } = useGameState();

  return (
    <div className={styles.page}>
      <main className={styles.game}>
        <header className={styles.gameHeader}>
          <Timer
            value={flagsLeft}
            label="Кількість прапорців"
            className={styles.counter}
            isLive
          />

          <RestartButton onRestart={initGame} />

          <Timer
            value={gameTime}
            label="Таймер"
            className={styles.counter}
          />
        </header>

        <GameStatus status={status} className={styles.gameStatus} />

        <Board
          board={board}
          gameStatus={status}
          explodedCell={explodedCell}
          onOpenCell={handleOpenCell}
          onToggleFlag={handleToggleFlag}
        />
      </main>
    </div>
  );
}