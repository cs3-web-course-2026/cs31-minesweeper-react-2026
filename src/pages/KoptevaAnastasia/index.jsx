import { GAME_STATUS, MINES_COUNT } from './constants/game';
import { countFlags } from './utils/board';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import Board from './components/Board';
import GameHeader from './components/GameHeader';
import GameStatus from './components/GameStatus';

import styles from './KoptevaAnastasia.module.css';

function KoptevaAnastasia() {
  const {
    board,
    status,
    explodedCell,
    seconds,
    restart,
    tick,
    revealCell,
    flagCell,
  } = useGameState();

  useTimer(status === GAME_STATUS.PROCESS, tick);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Minesweeper — Kopteva Anastasia</h1>
      <p className={styles.subtitle}>
        React-версія гри: {board.length}×{board[0].length}, {MINES_COUNT} мін
      </p>

      <section className={styles.game}>
        <GameHeader
          flagsLeft={MINES_COUNT - countFlags(board)}
          seconds={seconds}
          status={status}
          onRestart={restart}
        />

        <Board
          board={board}
          explodedCell={explodedCell}
          onReveal={revealCell}
          onFlag={flagCell}
        />

        <GameStatus status={status} />
      </section>
    </div>
  );
}

export default KoptevaAnastasia;
