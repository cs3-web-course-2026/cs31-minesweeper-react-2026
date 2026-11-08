import { GAME_CONFIG, STATUS } from './constants';
import { useMinesweeper } from './hooks/useMinesweeper';
import GameHeader from './components/GameHeader/GameHeader';
import Board from './components/Board/Board';
import GameStatus from './components/GameStatus/GameStatus';
import styles from './KorzhykAnton.module.css';

export default function KorzhykAnton() {
  const { field, status, gameTime, explodedCell, flagsLeft, handleOpen, handleFlag, restart } =
    useMinesweeper(GAME_CONFIG);

  return (
    <div className={styles.page}>
      <main className={styles.game}>
        <h1 className={styles.title}>Minesweeper</h1>

        <GameHeader flagsLeft={flagsLeft} gameTime={gameTime} status={status} onRestart={restart} />

        <Board
          field={field}
          isFinished={status !== STATUS.PROCESS}
          isLost={status === STATUS.LOSE}
          explodedCell={explodedCell}
          onOpen={handleOpen}
          onFlag={handleFlag}
        />

        <GameStatus status={status} />
      </main>
    </div>
  );
}
