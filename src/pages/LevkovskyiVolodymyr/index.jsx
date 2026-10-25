import { GAME_STATUS } from './constants/game';
import { useMinesweeper } from './hooks/useMinesweeper';
import { ControlButtons } from './components/ControlButtons';
import {
  Timer,
  FlagCounter,
  GameStatus,
} from './components/StatusIndicators';
import { Board } from './components/Board';
import styles from './LevkovskyiVolodymyr.module.css';

function LevkovskyiVolodymyr() {
  const {
    board,
    gameStatus,
    seconds,
    flagsRemaining,
    explodedCoordinates,
    rows,
    cols,
    minesCount,
    startGame,
    stopGame,
    openCell,
    toggleFlag,
  } = useMinesweeper();

  const isGameRunning = gameStatus === GAME_STATUS.PROCESS;

  let statusMessage = '';

  if (gameStatus === GAME_STATUS.PROCESS) {
    statusMessage = `Mines: ${minesCount}`;
  } else if (gameStatus === GAME_STATUS.WIN) {
    statusMessage = `You win! Time: ${seconds} s`;
  } else if (gameStatus === GAME_STATUS.LOSE) {
    statusMessage = 'Game Over! You hit a mine.';
  }

  return (
    <div className={styles.gameWrapper}>
      <header className={styles.gameHeader}>
        <ControlButtons
          isGameRunning={isGameRunning}
          onStart={startGame}
          onStop={stopGame}
        />
        <div className={styles.scoresContainer}>
          <Timer seconds={seconds} />
          <FlagCounter count={flagsRemaining} />
          <GameStatus message={statusMessage} />
        </div>
      </header>

      <main className={styles.mainArea}>
        <Board
          board={board}
          rows={rows}
          cols={cols}
          gameStatus={gameStatus}
          explodedCoordinates={explodedCoordinates}
          onOpenCell={openCell}
          onToggleFlag={toggleFlag}
        />
      </main>
    </div>
  );
}

export default LevkovskyiVolodymyr;
