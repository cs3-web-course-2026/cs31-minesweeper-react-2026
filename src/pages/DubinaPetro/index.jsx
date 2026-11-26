import Board from './components/Board/Board';
import Counter from './components/Counter/Counter';
import GameStatus from './components/GameStatus/GameStatus';
import RestartButton from './components/RestartButton/RestartButton';
import ResultIndicator from './components/ResultIndicator/ResultIndicator';
import { GAME_STATUS } from './constants';
import { useMinesweeper } from './hooks/useMinesweeper';
import styles from './Game.module.css';

function DubinaPetro() {
  const {
    board,
    explodedCell,
    flagsLeft,
    gameTime,
    openCell,
    restartGame,
    status,
    toggleFlag,
  } = useMinesweeper();
  const isFinished = status !== GAME_STATUS.PROCESS;

  return (
    <main className={styles.page}>
      <section className={styles.game} aria-labelledby="game-title">
        <h1 id="game-title" className={styles.title}>Minesweeper</h1>
        <div className={styles.header}>
          <Counter className={styles.timer} label="Time" value={gameTime} />
          <ResultIndicator
            className={styles.loss}
            isActive={status === GAME_STATUS.LOSE}
            label="LOSS"
          />
          <RestartButton className={styles.restart} onRestart={restartGame} status={status} />
          <ResultIndicator
            className={styles.win}
            isActive={status === GAME_STATUS.WIN}
            label="WIN"
          />
          <Counter className={styles.mines} isLive label="Mines" value={flagsLeft} />
        </div>

        <Board
          board={board}
          disabled={isFinished}
          explodedCell={explodedCell}
          onOpen={openCell}
          onToggleFlag={toggleFlag}
        />

        <GameStatus status={status} />
      </section>
    </main>
  );
}

export default DubinaPetro;
