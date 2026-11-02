import { useEffect, useState } from 'react';

import Board from './components/Board';
import GameHeader from './components/GameHeader';
import GameStatus from './components/GameStatus';
import {
  GAME_STATUS,
  MINES_COUNT,
  SECOND,
  countFlags,
  createEmptyBoard,
  generateBoard,
  openCell,
  toggleFlag,
} from './gameLogic';
import styles from './KoptevaAnastasia.module.css';

function KoptevaAnastasia() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [status, setStatus] = useState(GAME_STATUS.IDLE);
  const [seconds, setSeconds] = useState(0);
  const [explodedCell, setExplodedCell] = useState(null);

  useEffect(() => {
    if (status !== GAME_STATUS.PROCESS) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, SECOND);

    return () => clearInterval(intervalId);
  }, [status]);

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setStatus(GAME_STATUS.IDLE);
    setSeconds(0);
    setExplodedCell(null);
  };

  const handleOpen = (row, col) => {
    if (status === GAME_STATUS.WIN || status === GAME_STATUS.LOSE) {
      return;
    }

    const currentBoard =
      status === GAME_STATUS.IDLE ? generateBoard(row, col) : board;
    const result = openCell(currentBoard, row, col);

    setBoard(result.board);
    setStatus(result.status);
    setExplodedCell(result.explodedCell);
  };

  const handleToggleFlag = (row, col) => {
    if (status !== GAME_STATUS.PROCESS) {
      return;
    }

    setBoard(toggleFlag(board, row, col));
  };

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
          onRestart={handleRestart}
        />

        <Board
          board={board}
          explodedCell={explodedCell}
          onOpen={handleOpen}
          onToggleFlag={handleToggleFlag}
        />

        <GameStatus status={status} />
      </section>
    </div>
  );
}

export default KoptevaAnastasia;
