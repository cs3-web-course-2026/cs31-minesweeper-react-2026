import { useCallback, useState } from 'react';

import Board from './components/Board/Board';
import GameMessage from './components/GameMessage/GameMessage';
import StatusBar from './components/StatusBar/StatusBar';
import {
  DEFAULT_CONFIG,
  GAME_STATUS,
  countFlags,
  createBoard,
  getGameStatus,
  hasStarted,
  openCell,
  toggleFlag,
} from './gameLogic';
import { useTimer } from './hooks/useTimer';
import styles from './Minesweeper.module.css';

function Minesweeper() {
  const [board, setBoard] = useState(() => createBoard(DEFAULT_CONFIG));

  // Статус, лічильник і старт гри виводяться з дошки — окремого стану для них не потрібно
  const status = getGameStatus(board);
  const isPlaying = status === GAME_STATUS.PROCESS;
  const { seconds, reset: resetTimer } = useTimer(isPlaying && hasStarted(board));

  const handleOpen = useCallback(
    (row, col) => {
      if (isPlaying) setBoard((prev) => openCell(prev, row, col));
    },
    [isPlaying]
  );

  const handleFlag = useCallback(
    (row, col) => {
      if (isPlaying) {
        setBoard((prev) => toggleFlag(prev, row, col, DEFAULT_CONFIG.minesCount));
      }
    },
    [isPlaying]
  );

  const handleRestart = () => {
    setBoard(createBoard(DEFAULT_CONFIG));
    resetTimer();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <StatusBar
            flagsLeft={DEFAULT_CONFIG.minesCount - countFlags(board)}
            seconds={seconds}
            onRestart={handleRestart}
          />
          <GameMessage status={status} />
          <Board board={board} isGameOver={!isPlaying} onOpen={handleOpen} onFlag={handleFlag} />
        </div>
      </main>
    </div>
  );
}

export default Minesweeper;
